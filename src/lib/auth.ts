import { supabase } from './supabase';

export const checkAuth = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
};

export const signIn = async (password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: import.meta.env.VITE_ADMIN_EMAIL,
    password,
  });

  if (error && error.message.includes('Invalid login credentials')) {
    return { error: { message: 'Invalid password' } };
  }

  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};
