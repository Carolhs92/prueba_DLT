"use client";
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import CustomSelect from '@/components/CustomSelect'; 
import style from '@/styles/criaturas.module.scss';

const PerfilPage = () => {
  const t = useTranslations('Perfil');
  
  // Estado inicial basado en el valor guardado en el registro.
  const [selectedType, setSelectedType] = useState('fenix');

  useEffect(() => {
    // Supongamos que estamos obteniendo el tipo guardado en el registro desde localStorage
    const savedType = localStorage.getItem('selectedType');
    if (savedType) {
      setSelectedType(savedType);
    }
  }, []);

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    // Guardar el tipo seleccionado en localStorage
    localStorage.setItem('selectedType', value);
  };

  const options = [
    { value: 'fenix', label: t('holder_tipo') },
    { value: 'dragon', label: t('dragon') },
    { value: 'golem', label: t('golem') },
    { value: 'vampiro', label: t('vampiro') },
    { value: 'unicornio', label: t('unicornio') },
  ];

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
              placeholder={t('')}
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
              placeholder={t('')}
              disabled
            />
          </div>
          <div className={style['perfil-page__input-container']}>
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
          <div className={style['perfil-page__input-container']}>
            <label htmlFor="descripcion2" className={style['perfil-page__label']}>
              {t('descripcion2')}
            </label>
            <input
              id="descripcion2"
              name="descripcion2"
              className={style['perfil-page__input']}
              type="text"
              placeholder={t('descripcion_personaje')}
              disabled
            />
          </div>
        </form>
      </div>
    </main>
  );
};

export default PerfilPage;
