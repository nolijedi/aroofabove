import { supabase } from './supabase';

export const createAdminUser = async (password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email: import.meta.env.VITE_ADMIN_EMAIL,
    password: password,
    options: {
      data: {
        role: 'admin'
      }
    }
  });
  
  if (error) {
    console.error('Error creating admin:', error.message);
    return { error };
  }
  
  // Immediately sign in after creation
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email: import.meta.env.VITE_ADMIN_EMAIL,
    password: password
  });
  
  if (signInError) {
    console.error('Error signing in:', signInError.message);
    return { error: signInError };
  }
  
  return { data: signInData };
};
