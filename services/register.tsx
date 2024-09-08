import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore'

const db = getFirestore();

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: string;
}

export async function registerUser({ email, password, name, role }: RegisterData) {
  try {
    // Crear
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guardar 
    await setDoc(doc(db, 'users', user.uid), {
      name,
      email,
      role,
    });
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user, role };

  } catch (err: any) {
    if (err.code === 'auth/email-already-in-use') {
      throw new Error('Este correo electrónico ya está registrado.');
    } else {
      throw new Error(`Error al crear la cuenta: ${err.message}`);
    }
  }
}
