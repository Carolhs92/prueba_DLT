import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase'; 

const useFetchAllCriaturas = () => {
  const [criaturas, setCriaturas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCriaturas = async () => {
      try {
        const criaturasCollection = collection(db, 'criaturas');
        const criaturasSnapshot = await getDocs(criaturasCollection);
        const criaturasList = criaturasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setCriaturas(criaturasList);
        setLoading(false);
      } catch (err) {
        console.error('Error obteniendo las criaturas:', err);
        setError('Error obteniendo las criaturas');
        setLoading(false);
      }
    };

    fetchCriaturas();
  }, []);

  return { criaturas, loading, error };
};

export default useFetchAllCriaturas;
