'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image'
import style from '@/styles/page.module.scss'
import { Link } from '@/i18n/routing';  
import { useParams } from 'next/navigation';

export default function LoginPage() {
  const t = useTranslations('login');
  const params = useParams();
  const locale = params.locale as string;

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
            <form className={style['login-page__form']}>
                <label className={style['login-page__label']}>
                    {t('email')}
                </label>
                <input className={style['login-page__input']} type="email" placeholder={t('holder_email')} />
                <label className={style['login-page__label']}>
                    {t('password')}
                </label>
                <input className={style['login-page__input']} type="password" placeholder={t('holder_password')} />
                <button className={style['login-page__button']}>{t('enter')}</button>
            </form>
            <Link href="/register" className={style['main-page__link']}>{t('register')}</Link>
        </div>

    </main>
  );
}