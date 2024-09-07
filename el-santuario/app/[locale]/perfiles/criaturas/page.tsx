"use client";
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import style from '@/styles/criaturas.module.scss';
import Image from 'next/image';

const CriaturasPage = () => {
  const t = useTranslations('Criaturas');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]); // Cambiamos a array de strings

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedTypes((prev) => [...prev, value]); // Agregar al array
    } else {
      setSelectedTypes((prev) => prev.filter((criatura) => criatura !== value)); // Remover del array
    }
  };

  const handleFiltrar = () => {
    // Aquí puedes manejar el filtrado de las criaturas seleccionadas
    console.log('Criaturas seleccionadas:', selectedTypes);
    // Realiza el filtrado según tus necesidades
  };

  const options = [
    { value: 'fenix', label: t('fenix') },
    { value: 'dragon', label: t('dragon') },
    { value: 'golem', label: t('golem') },
    { value: 'vampiro', label: t('vampiro') },
    { value: 'unicornio', label: t('unicornio') },
  ];

  return (
    <main className={style['criaturas-page']}>
      <div className={style['criaturas-page__content']}>
        <h3 className={style['criaturas-page__title']}>{t('titulo')}</h3>
        <p className={style['criaturas-page__about']}>{t('descripcion')}</p>
        <button
          className={style['criaturas-page__button']}
          onClick={() => (window.location.href = '/perfiles/crear_criaturas')}
        >
          {t('crear_criatura')}
        </button>

        <section className={style['criaturas-page__section']}>
          <div>
            <h3 className={style['criaturas-page__title3']}>{t('filtro')}</h3>
            <h4 className={style['criaturas-page__title3']}>{t('buscar')}</h4>
            <div className={style['criaturas-page__input-container']}>
              <fieldset className={style['criaturas-page__fieldset']}>
                <div className={style['criaturas-page__checkbox-group2']}>
                  {options.map((option) => (
                    <label
                      key={option.value}
                      htmlFor={`criatura-${option.value}`}
                      className={style['criaturas-page__checkbox-label']}
                    >
                      <input
                        type="checkbox"
                        id={`criatura-${option.value}`}
                        value={option.value}
                        className={style['criaturas-page__checkbox']}
                        onChange={handleCheckboxChange}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <button
                className={style['criaturas-page__button']}
                onClick={handleFiltrar}
              >
                {t('filtrar')}
              </button>
            </div>
          </div>
          <div className={style['criaturas-page__table-container']}>
            <div className={style['criaturas-page__input-container2']}>
                <label htmlFor="nombre" className={style['criaturas-page__label']}>
                    {t('palabra')}
                </label>
                <input
                    id="nombre"
                    name="nombre"
                    className={style['criaturas-page__input']}
                    type="text"
                    placeholder={t('holder_nombre2')}
                />
            </div>
            <table className={style['criaturas-page__table']}>
                <thead className={style['criaturas-page__thead']}>
                    <tr className={style['criaturas-page__tr']}>
                    <th className={style['criaturas-page__th']}>{t('holder_nombre2')}</th>
                    <th className={style['criaturas-page__th']}>{t('tipo2')}</th>
                    <th className={style['criaturas-page__th']}>{t('nivel')}</th>
                    <th className={style['criaturas-page__th']}>{t('entrenado')}</th>
                    <th className={style['criaturas-page__th']}>{t('acciones')}</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {criaturas.map((criatura, index) => ( */}
                    <tr className={style['criaturas-page__tr']}>{/*key={index} */}
                        <td className={style['criaturas-page__td']}>{t('holder_nombre2')}</td>
                        <td className={style['criaturas-page__td']}>{t('tipo2')}</td>
                        <td className={style['criaturas-page__td']}>{t('nivel')}</td>
                        <td className={style['criaturas-page__td']}>{t('si')}</td>
                        <td className={style['criaturas-page__td']}>
                            <Image src="/icons/pencil.png" width={20} height={20} alt="Editar" />
                        </td>
                    </tr>
                    {/* ))}*/}
                </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

export default CriaturasPage;
