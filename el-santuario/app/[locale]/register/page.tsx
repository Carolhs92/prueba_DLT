"use client";
import { useTranslations } from 'next-intl';
import Image from 'next/image'
import style from '@/styles/page.module.scss'
import Link from 'next/link';
import { useState } from 'react';
import CustomSelect from '@/components/CustomSelect';

export default function RegisterPage() {
  const t = useTranslations('register');
  const [selectedType, setSelectedType] = useState('Cuidador');

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
  };

  const options = [
    { value: 'cuidador', label: t('cuidador') },
    { value: 'maestro', label: t('maestro') },
  ];

  return (
    <main className={style['register-page']}>
        <div className={style['register-page__image-container']}>
            <Image 
            className={style['register-page__image']}
            src="/assets/register.png"
            width={800} 
            height={1000} 
            alt="Picture of the animal magic"/>
        </div>
        <div className={style['register-page__content']}>
            <h1 className={style['register-page__title']}>{t('title')}</h1>
            <p className={style['register-page__about']}>{t('about')}</p>
            <form className={style['register-page__form']}>
                <label className={style['register-page__label']}>
                    {t('nombre')}
                </label>
                <input className={style['register-page__input']} type="name" placeholder={t('holder_nombre')} />
                <label className={style['register-page__label']}>
                    {t('email')}
                </label>
                <input className={style['register-page__input']} type="email" placeholder={t('holder_email')} />
                <label className={style['register-page__label']}>
                    {t('rol')}
                </label>
                <CustomSelect 
                    value={selectedType} 
                    onChange={handleTypeChange} 
                    options={options}
                />
                <label className={style['register-page__label']}>
                    {t('password')}
                </label>
                <input className={style['register-page__input']} type="password" placeholder={t('holder_password')} />
                <button className={style['register-page__button']}>{t('enter')}</button>
            </form>
            <Link href={{ pathname: "/login" }} className={style['register-page__link']}>{t('login')}</Link>
            </div>
    </main>
    
  );
}
