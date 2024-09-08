import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const db = getFirestore(); 

interface LoginData {
  email: string;
  password: string;
}

export async function loginUser({ email, password }: LoginData) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDocRef = doc(db, 'users', user.uid); 
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const role = userData.role; 

      return { success: true, user, role };
    } else {
      throw new Error('No se encontraron datos del usuario.');
    }
  } catch (err: any) {
    if (err.code === 'auth/wrong-password') {
      throw new Error('La contraseña es incorrecta.');
    } else if (err.code === 'auth/user-not-found') {
      throw new Error('No existe una cuenta con este correo electrónico.');
    } else {
      throw new Error(`Error al iniciar sesión: ${err.message}`);
    }
  }
}
