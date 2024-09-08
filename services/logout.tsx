import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

export async function logoutUser() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (err: any) {
    throw new Error(`Error al cerrar sesión: ${err.message}`);
  }
}