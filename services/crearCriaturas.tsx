import { db, auth } from '@/lib/firebase'; 
import { collection, addDoc } from 'firebase/firestore';

export async function crearCriatura({ nombre, tipo, poder, entrenada }: any) {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error('No se ha autenticado ningún usuario');
    }

    const docRef = await addDoc(collection(db, 'criaturas'), {
      nombre,
      tipo,
      poder,
      entrenada,
      usuarioId: user.uid, 
      fechaCreacion: new Date(),
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error al crear la criatura: ', error);
    throw new Error('No se pudo crear la criatura');
  }
}
