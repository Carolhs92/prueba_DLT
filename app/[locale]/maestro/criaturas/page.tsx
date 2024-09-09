"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import style from '@/styles/criaturas.module.scss';
import Image from 'next/image';
import useFetchCriaturas from '@/hooks/useFetchCriaturas';
import Link from 'next/link';
import { deleteCriatura } from '@/services/eliminarCriatura'; 

const CriaturasPage = () => {
  const t = useTranslations('Criaturas');
  const { criaturas, loading, error } = useFetchCriaturas();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCriaturaId, setSelectedCriaturaId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null); // dropdown

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedTypes((prev) => [...prev, value]);
    } else {
      setSelectedTypes((prev) => prev.filter((criatura) => criatura !== value));
    }
  };

  const handleDelete = async (criaturaId: string) => {
    try {
      await deleteCriatura(criaturaId);
      console.log(`Borrada criatura con ID: ${criaturaId}`);
      window.location.reload();
    } catch (error) {
      console.error('Error al eliminar la criatura:', error);
    }
  };

  const handleFiltrar = () => {
    console.log('Criaturas seleccionadas:', selectedTypes);
  };

  const options = [
    { value: 'fenix', label: t('fenix') },
    { value: 'dragon', label: t('dragon') },
    { value: 'golem', label: t('golem') },
    { value: 'vampiro', label: t('vampiro') },
    { value: 'unicornio', label: t('unicornio') },
  ];

  const handleEditClick = (criaturaId: string) => {
    setSelectedCriaturaId((prevId) => (prevId === criaturaId ? null : criaturaId));
  };

  // Clic fuera del dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSelectedCriaturaId(null); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);


  return (
    <main className={style['criaturas-page']}>
      <div className={style['criaturas-page__content']}>
        <h3 className={style['criaturas-page__title']}>{t('titulo')}</h3>
        <p className={style['criaturas-page__about']}>{t('descripcion')}</p>
        <button
          className={style['criaturas-page__button']}
          onClick={() => (window.location.href = '/maestro/crear_criaturas')}
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

            {loading && <p>{t('cargando')}</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && criaturas.length === 0 && <p>{t('sin_criaturas')}</p>}
            {!loading && !error && criaturas.length > 0 && (
              <div>
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
                    {criaturas.map((criatura) => (
                      <tr className={style['criaturas-page__tr']} key={criatura.id}>
                        <td className={style['criaturas-page__td']}>{criatura.nombre}</td>
                        <td className={style['criaturas-page__td']}>{criatura.tipo}</td>
                        <td className={style['criaturas-page__td']}>{criatura.poder}</td>
                        <td className={style['criaturas-page__td']}>{criatura.entrenada ? t('si') : t('no')}</td>
                        <td className={style['criaturas-page__td']}>
                        <Image
                        src="/icons/pencil.png"
                        width={20}
                        height={20}
                        alt="Editar"
                        onClick={() => handleEditClick(criatura.id)} 
                        className={style['criaturas-page__edit-icon']}
                      />
                      {selectedCriaturaId === criatura.id && (
                        <div className={style['criaturas-page__dropdown-container']}>
                          <Link 
                            href={{
                              pathname: '/maestro/crear_criaturas',
                              query: { criaturaId: criatura.id },
                            }} 
                            className={style['criaturas-page__link']}
                          >
                            {t('Editar')}
                          </Link>
                          <button onClick={() => handleDelete(criatura.id)} className={style['criaturas-page__link']}>{t('Borrar')}</button>
                        </div>
                      )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default CriaturasPage;
