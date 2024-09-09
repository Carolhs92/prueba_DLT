import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const deleteCriatura = async (criaturaId: string) => {
  try {
    const criaturaRef = doc(db, 'criaturas', criaturaId);
    await deleteDoc(criaturaRef);
    console.log('Criatura eliminada correctamente');
  } catch (error) {
    console.error('Error al eliminar la criatura:', error);
    throw new Error('No se pudo eliminar la criatura');
  }
};
