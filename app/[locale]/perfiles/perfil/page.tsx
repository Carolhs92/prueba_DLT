"use client";
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import CustomSelect from '@/components/CustomSelect'; 
import style from '@/styles/perfil.module.scss';

const PerfilPage = () => {
  const t = useTranslations('Perfil');
  const [selectedType, setSelectedType] = useState('fenix');
  const [role, setRole] = useState<'cuidador' | 'maestro'>('cuidador');

  useEffect(() => {
    const savedType = localStorage.getItem('selectedType');
    if (savedType) {
      setSelectedType(savedType);
    }
    setRole('cuidador'); 
  }, []);

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
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
                placeholder={t('falta')}
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
                placeholder={t('falta')}
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
            <div className={`${style['perfil-page__input-container']} textarea`}>
              <label htmlFor="descripcion2" className={style['perfil-page__label']}>
                {t('descripcion2')}
              </label>
              <textarea
                id="descripcion2"
                name="descripcion2"
                className={style['perfil-page__textarea']}
                placeholder={t('descripcion_personaje')}
                disabled
                rows={5}
              />
            </div>
          </form>
        </div>
      </main>
  );
};

export default PerfilPage;
