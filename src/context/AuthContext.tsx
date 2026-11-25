import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

type SignUpResult = {
  error: string | null;
  // true when Supabase needs the user to confirm their email before signing in
  needsEmailConfirmation: boolean;
};

type AuthContextType = {
  user: User | null;
  isSignedIn: boolean;
  loading: boolean;
  // Returns an error message, or null if it worked.
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (email: string, password: string) => Promise<SignUpResult>;
  // Signs the user out. Returns an error message, or null if it worked.
  // The listener below updates `user` by itself afterwards.
  signOut: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (mounted) {
          setUser(session?.user ?? null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    loadSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (
    email: string,
    password: string,
  ): Promise<string | null> => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return error ? error.message : null;
  };

  const signUp = async (
    email: string,
    password: string,
  ): Promise<SignUpResult> => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return { error: error.message, needsEmailConfirmation: false };
    }

    // No session means email confirmation is on: they must click the link first.
    return { error: null, needsEmailConfirmation: !data.session };
  };

  const signOut = async (): Promise<string | null> => {
    const { error } = await supabase.auth.signOut();
    return error ? error.message : null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isSignedIn: user !== null,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
