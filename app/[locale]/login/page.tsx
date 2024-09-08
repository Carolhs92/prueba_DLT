'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image'
import style from '@/styles/page.module.scss'
import { useParams } from 'next/navigation';
import { loginUser } from '@/services/login';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const t = useTranslations('login');
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const params = useParams();
  const locale = params?.locale ? params.locale as string : 'es';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
        const response = await loginUser({ email, password });
        const { role } = response;  
  
        if (role === 'maestro') {
          window.location.href = `/maestro/criaturas`;
        } else if (role === 'cuidador') {
          window.location.href = `/perfiles/criaturas`;
        } else {
          setError('Rol no válido');
        }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={style['login-page']}>
        <Image 
        className={style['login-page__image']}
        src="/assets/login.png"
        width={800} 
        height={800} 
        alt="Picture of the animal magic"/>
        <div className={style['login-page__content']}>
            <h1 className={style['login-page__title']}>{t('title')}</h1>
            <p className={style['login-page__about']}>{t('about')}</p>
            <form className={style['login-page__form']}  onSubmit={handleSubmit}>
                <label className={style['login-page__label']}>
                    {t('email')}
                </label>
                <input 
                    className={style['login-page__input']} 
                    type="email" 
                    placeholder={t('holder_email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label className={style['login-page__label']}>
                    {t('password')}
                </label>
                <input 
                    className={style['login-page__input']} 
                    type="password" 
                    placeholder={t('holder_password')} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className={style['error']}>{error}</p>}
                <button 
                    className={style['login-page__button']}
                    type="submit" 
                    disabled={loading}
                >{loading ? t('cargando') : t('enter')}
                </button>
            </form>
            <Link href={{ pathname: '/register' }} className={style['login-page__link']}>
                {t('register')}
            </Link>
        </div>
    </main>
);
}