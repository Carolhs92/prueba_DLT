"use client";
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import CustomSelect from '@/components/CustomSelect'; 
import style from '@/styles/criaturas.module.scss';
import { crearCriatura } from '@/services/crearCriaturas';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase'; 

const CriaturasPage = () => {
  const t = useTranslations('Criaturas');
  const [selectedType, setSelectedType] = useState('fenix');
  const [nombre, setNombre] = useState('');
  const [poder, setPoder] = useState(''); 
  const [entrenada, setEntrenada] = useState('');
  const [criaturaId, setCriaturaId] = useState<string | null>(null);

  // Función para obtener el parámetro "criaturaId" desde la URL
  const getCriaturaIdFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('criaturaId');
  };

  // Cargar los datos de la criatura
  useEffect(() => {
    const id = getCriaturaIdFromURL(); 
    if (id) {
      setCriaturaId(id);
      loadCriaturaData(id);
    }
  }, []);
  

  // Función para cargar los datos de la criatura desde Firestore
  const loadCriaturaData = async (id: string) => {
    try {
      console.log('Intentando cargar datos de la criatura con ID:', id);
      const docRef = doc(db, 'criaturas', id);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log('Datos de la criatura:', data);
        setNombre(data.nombre || '');
        setSelectedType(data.tipo || 'fenix');
        setPoder(data.poder ? data.poder.toString() : '');
        setEntrenada(data.entrenada ? 'si' : 'no');
      } else {
        console.error('No se encontró la criatura');
      }
    } catch (error) {
      console.error('Error al cargar los datos de la criatura:', error);
    }
  };
  
  const handleTypeChange = (value: string) => {
    setSelectedType(value);
  };

  const handleEntrenadaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntrenada(e.target.value);
  };

  const handlePoderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPoder(e.target.value); 
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const poderNumerico = parseInt(poder, 10);

      if (isNaN(poderNumerico)) {
        console.error('El valor del poder no es un número válido.');
        return;
      }

      if (criaturaId) {
        // actualiza la criatura existente
        const docRef = doc(db, 'criaturas', criaturaId);
        await updateDoc(docRef, {
          nombre,
          tipo: selectedType,
          poder: poderNumerico,
          entrenada: entrenada === 'si',
        });
      } else {
        // creamos una nueva criatura
        const userId = "uid_usuario"; 
        await crearCriatura({
          nombre,
          tipo: selectedType,
          poder: poderNumerico,
          entrenada: entrenada === 'si',
          usuarioId: userId
        });
      }

      window.location.href = `/perfiles/criaturas`; 
    } catch (error) {
      console.error('Error al crear o actualizar criatura', error);
    }
  };

  const options = [
    { value: 'fenix', label: t('holder_tipo') },
    { value: 'dragon', label: t('dragon') },
    { value: 'golem', label: t('golem') },
    { value: 'vampiro', label: t('vampiro') },
    { value: 'unicornio', label: t('unicornio') },
  ];

  return (
    <main className={style['criaturas-page']}>
      <div className={style['criaturas-page__content']}>
        <h3 className={style['criaturas-page__title']}>{criaturaId ? t('editar') : t('titulo')}</h3>
        <p className={style['criaturas-page__about']}>{t('descripcion')}</p>
        <form 
          className={style['criaturas-page__form']} 
          id="crear-criatura" 
          onSubmit={handleSubmit}
        >
          <div className={style['criaturas-page__input-container']}>
            <label htmlFor="nombre" className={style['criaturas-page__label']}>
              {t('nombre')}
            </label>
            <input
              id="nombre"
              name="nombre"
              className={style['criaturas-page__input']}
              type="text"
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              placeholder={t('holder_nombre')}
              required
            />
          </div>
          <div className={style['select']}>
            <label htmlFor="tipo" className={style['criaturas-page__label']}>
              {t('tipo')}
            </label>
            <CustomSelect 
              value={selectedType} 
              onChange={handleTypeChange} 
              options={options}
            />
          </div>
          <div className={style['criaturas-page__input-container']}>
            <label htmlFor="poder" className={style['criaturas-page__label']}>
              {t('poder')}
            </label>
            <input
              id="poder"
              name="poder"
              className={style['criaturas-page__input']}
              type="number"
              value={poder} 
              onChange={handlePoderChange} 
              placeholder={t('holder_poder')}
              required
            />
          </div>
          <div className={style['criaturas-page__input-container']}>
            <fieldset className={style['criaturas-page__fieldset']}>
              <legend className={style['criaturas-page__label']}>{t('entrenamiento')}</legend>
              <div className={style['criaturas-page__checkbox-group']}>
                <label htmlFor="entrenamiento-si" className={style['criaturas-page__checkbox-label']}>
                  <input
                    type="radio"
                    id="entrenamiento-si"
                    name="entrenamiento"
                    value="si"
                    checked={entrenada === 'si'} 
                    onChange={handleEntrenadaChange} 
                    className={style['criaturas-page__checkbox']}
                  />
                  {t('si')}
                </label>
                <label htmlFor="entrenamiento-no" className={style['criaturas-page__checkbox-label']}>
                  <input
                    type="radio"
                    id="entrenamiento-no"
                    name="entrenamiento"
                    value="no"
                    checked={entrenada === 'no'} 
                    onChange={handleEntrenadaChange} 
                    className={style['criaturas-page__checkbox']}
                  />
                  {t('no')}
                </label>
              </div>
            </fieldset>
          </div>
        </form>
        <h3 className={style['criaturas-page__title2']}>{t('titulo2')}</h3>
        <div className={style['criaturas-page__button-container']}>
          <button className={style['criaturas-page__button']} type="submit" form="crear-criatura">{t('registrar')}</button>
        </div>
      </div>
    </main>
  );
};

export default CriaturasPage;
