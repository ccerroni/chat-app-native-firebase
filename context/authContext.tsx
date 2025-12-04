import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";

// Define a flexible user shape (update fields to match your auth provider)
export type User = {
  id?: string;
  email?: string;
  username?: string;
  profileUrl?: string;
} | null;

interface AuthContextType {
  user: User;
  isAuthenticated?: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; msg?: any }>;
  logout: () =>  Promise<{ success: boolean; msg?: any }>;
  register: (
    email: string,
    password: string,
    username: string,
    profileUrl?: string
  ) => Promise<
    | {
        success: boolean;
        data: User;
        msg?: undefined;
      }
    | {
        success: boolean;
        msg: any;
        data?: undefined;
      }
  >;
}

// Use `undefined` as the default so consumers can detect an uninitialized context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (usr) => {
      if (usr) {
        setUser(usr as User);
        setIsAuthenticated(true);
        updateUserData(usr.uid);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
    return unsub;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true }
    } catch (e: Error | any) {
      let msg = e?.message || "Error registering user";
      if (msg.includes("auth/invalid-email")) {
        msg = "Invalid email address";
      }
       if (msg.includes("auth/wrong-password")) {
        msg = "Wrong credentials";
      }
      return { success: false, msg };
    }
  };

  const logout = async () => {
     try {
      await signOut(auth);
      return { success: true }
    } catch (e: Error | any) {
      return { success: false, msg: e?.message };
    }
  };

  const register = async (
    email: string,
    password: string,
    username: string,
    profileUrl?: string
  ) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log({ response });

      const firebaseUser = response?.user;
      const userObj: User = firebaseUser
        ? {
            id: firebaseUser.uid,
            email: firebaseUser.email || undefined,
            username,
            profileUrl,
          }
        : null;

      await setDoc(doc(db, "users", firebaseUser?.uid || ""), {
        username,
        profileUrl,
        userId: firebaseUser?.uid,
      });

      setUser(userObj);
      setIsAuthenticated(!!firebaseUser);

      return { success: true, data: userObj };
    } catch (e: Error | any) {
      let msg = e?.message || "Error registering user";
      if (msg.includes("auth/invalid-email")) {
        msg = "Invalid email address";
      }
       if (msg.includes("auth/email-already-in-use")) {
        msg = "Email address is already in use";
      }
      return { success: false, msg };
    }
  };

  const updateUserData = async (userId: string) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
      const data = docSnap.data();
      setUser({
        ...user,
        username: data.username,
        profileUrl: data.profileUrl,
        id: userId,
        email: auth.currentUser?.email || undefined,
      })

    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
