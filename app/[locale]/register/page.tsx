"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import style from '@/styles/page.module.scss';
import Link from 'next/link';
import CustomSelect from '@/components/CustomSelect';

import { registerUser } from '@/services/register'; 

export default function RegisterPage() {
  const t = useTranslations('register');
  const router = useRouter();
  const [selectedType, setSelectedType] = useState('Cuidador');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState('');

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await registerUser({ email, password, name, role: selectedType });

      window.location.href = '/login';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
          alt="Picture of the animal magic"
        />
      </div>
      <div className={style['register-page__content']}>
        <h1 className={style['register-page__title']}>{t('title')}</h1>
        <p className={style['register-page__about']}>{t('about')}</p>

        <form className={style['register-page__form']} onSubmit={handleSubmit}>
          <label className={style['register-page__label']}>{t('nombre')}</label>
          <input
            className={style['register-page__input']}
            type="text"
            placeholder={t('holder_nombre')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className={style['register-page__label']}>{t('email')}</label>
          <input
            className={style['register-page__input']}
            type="email"
            placeholder={t('holder_email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className={style['register-page__label']}>{t('rol')}</label>
          <CustomSelect value={selectedType} onChange={handleTypeChange} options={options} />

          <label className={style['register-page__label']}>{t('password')}</label>
          <input
            className={style['register-page__input']}
            type="password"
            placeholder={t('holder_password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className={style['register-page__button']} type="submit" disabled={loading}>
            {loading ? t('cargando') : t('enter')}
          </button>
        </form>
        {error && <p className={style['error']}>{error}</p>}

        <Link href={{ pathname: "/login" }} className={style['register-page__link']}>{t('login')}</Link>
      </div>
    </main>
  );
}
