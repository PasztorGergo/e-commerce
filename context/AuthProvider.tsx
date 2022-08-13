import React, { createContext, useContext, useState, useEffect } from "react";
import { app, client } from "../app";
import * as Realm from "realm-web";
import Router, { useRouter } from "next/router";

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, []);

  const loginWithEmail = async (email: string, password: string) => {
    const credentials = Realm.Credentials.emailPassword(email, password);

    try {
      setLoading(true);
      const logged = await app.logIn(credentials);
      setUser(logged.profile);
      router.push("/profile");
    } catch (error: any) {
      console.error({ message: error.message });
    } finally {
      setLoading(false);
    }
  };
  const loginWithGoogle = async () => {
    //@ts-ignore
    const credentials = Realm.Credentials.google({
      redirectUrl: "http://localhost:3000",
    });

    try {
      setLoading(true);
      const logged = await app.logIn(credentials);
      setUser(logged.profile);
      router.push("/profile");
    } catch (error: any) {
      console.error({ message: error.message });
    } finally {
      setLoading(false);
    }
  };
  const register = async (email: string, password: string) => {
    try {
      setLoading(true);
      await app.emailPasswordAuth.registerUser(email, password);

      const credentials = Realm.Credentials.emailPassword(email, password);

      const logged = await app.logIn(credentials);
      setUser(logged.profile);

      await client.mutate();

      router.push("/profile");
    } catch (error: any) {
      console.log({ message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loginWithEmail,
    loginWithGoogle,
    register,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
