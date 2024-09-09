import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface Criatura {
  id: string;
  nombre: string;
  tipo: string;
  poder: number;
  entrenada: boolean;
}

const useFetchCriaturas = () => {
  const [criaturas, setCriaturas] = useState<Criatura[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const q = query(
            collection(db, 'criaturas'),
            where('usuarioId', '==', user.uid)  
          );

          const querySnapshot = await getDocs(q);
          const criaturasData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Criatura[];

          setCriaturas(criaturasData);
        } catch (err) {
          setError('Error al obtener las criaturas');
          console.error('Error al obtener las criaturas:', err);
        } finally {
          setLoading(false);
        }
      } else {
        setError('No hay usuario autenticado');
        setLoading(false);
        console.error('No hay usuario autenticado');
      }
    });

    return () => unsubscribe();
  }, []);

  return { criaturas, loading, error };
};

export default useFetchCriaturas;
