"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import CustomSelect from '@/components/CustomSelect'; 
import style from '@/styles/perfil.module.scss';
import { auth } from '@/lib/firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const PerfilPage = () => {
  const t = useTranslations('Perfil');
  const [selectedType, setSelectedType] = useState(''); 
  const [userData, setUserData] = useState({ name: '', email: '', role: '' });
  const [loading, setLoading] = useState(true); 

  const db = getFirestore();

  const fetchUserData = useCallback(async (uid: string) => {
    try {
      const userDocRef = doc(db, 'users', uid);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        const data = userSnapshot.data();

        setUserData({
          name: data.name || '',
          email: data.email || '',
          role: data.role || '',  
        });

        setSelectedType(data.role || '');
      } else {
        console.log('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    } finally {
      setLoading(false); 
    }
  }, [db]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      fetchUserData(user.uid);
    }
  }, [fetchUserData]);

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    localStorage.setItem('selectedType', value);
  };

  const options = [
    { value: 'cuidador', label: t('cuidador') },
    { value: 'maestro', label: t('maestro') },
  ];

  if (loading) {
    return <p>{t('cargando')}</p>; 
  }

  return (
    <main className={style['perfil-page']}>
      <div className={style['perfil-page__content']}>
        <h3 className={style['perfil-page__title']}>{t('titulo')}</h3>
        <p className={style['perfil-page__about']}>{t('descripcion')}</p>
        <form className={style['perfil-page__form']}>
          <div className={style['perfil-page__input-container']}>
            <label htmlFor="nombre" className={style['perfil-page__label']}>
              {t('nombre')}
            </label>
            <input
              id="nombre"
              name="nombre"
              className={style['perfil-page__input']}
              type="text"
              value={userData.name || ''}  
              disabled
            />
          </div>
          <div className={style['perfil-page__input-container']}>
            <label htmlFor="email" className={style['perfil-page__label']}>
              {t('email')}
            </label>
            <input
              id="email"
              name="email"
              className={style['perfil-page__input']}
              type="email"
              value={userData.email || ''}  
              disabled
            />
          </div>
          <div className={style['select']}>
            <label htmlFor="rol" className={style['perfil-page__label']}>
              {t('rol')}
            </label>
            <CustomSelect 
              value={selectedType}  
              onChange={handleTypeChange} 
              options={options}
              disabled 
            />
          </div>
          <div className={ `style['perfil-page__input-container'] textarea`}>
            <label htmlFor="descripcion2" className={style['perfil-page__label']}>
              {t('descripcion2')}
            </label>
            <textarea
              id="descripcion2"
              name="descripcion2"
              className={style['perfil-page__textarea']}
              placeholder={t('descripcion_personaje2')}
              disabled
              rows={3}
            />
          </div>
        </form>
      </div>
    </main>
  );
};

export default PerfilPage;
