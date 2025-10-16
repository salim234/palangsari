import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Session } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error: string | null }>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  session: null,
  isAuthenticated: false,
  login: async () => ({ success: false, error: 'Provider not initialized' }),
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // onAuthStateChange akan langsung terpanggil dengan sesi yang ada saat ini.
    // Kode ini diubah menjadi lebih defensif untuk memastikan subscription selalu ditangani dengan benar.
    const authSubscription = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
    });

    // Berhenti memantau ketika komponen di-unmount
    return () => {
        authSubscription.data.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, pass: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, error: null };
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };
  
  const value = {
      session,
      isAuthenticated: !!session,
      login,
      logout,
  };

  // Selalu render children untuk memastikan aplikasi dapat dimuat
  // sementara sesi diperiksa di latar belakang. Ini memperbaiki masalah layar kosong.
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
