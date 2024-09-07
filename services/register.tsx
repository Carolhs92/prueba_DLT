import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: string;
}

export async function registerUser({ email, password, name, role }: RegisterData) {
  try {
    // Crear el usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guardar la información adicional del usuario en Firestore
    await setDoc(doc(db, 'users', user.uid), {
      name: name,
      email: email,
      role: role,
    });

    return { success: true, user };

  } catch (err: any) {
    if (err.code === 'auth/email-already-in-use') {
      throw new Error('Este correo electrónico ya está registrado.');
    } else {
      throw new Error(`Error al crear la cuenta: ${err.message}`);
    }
  }
}
