"use client";
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import CustomSelect from '@/components/CustomSelect'; 
import style from '@/styles/criaturas.module.scss';
import { useRouter } from 'next/navigation'; 

const CriaturasPage = () => {
  const t = useTranslations('Criaturas');
  const [selectedType, setSelectedType] = useState('fenix');
  const router = useRouter();

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
  };

  const options = [
    { value: 'fenix', label: t('holder_tipo') },
    { value: 'dragon', label: t('dragon') },
    { value: 'golem', label: t('golem') },
    { value: 'vampiro', label: t('vampiro') },
    { value: 'unicornio', label: t('unicornio') },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = '/maestro/criaturas'; 
  };

  return (
    <main className={style['criaturas-page']}>
      <div className={style['criaturas-page__content']}>
        <h3 className={style['criaturas-page__title']}>{t('titulo')}</h3>
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
              placeholder={t('holder_nombre')}
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
              placeholder={t('holder_poder')}
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
