"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import style from '@/styles/nav.module.scss';
import { useState } from 'react';
import { logoutUser } from '@/services/logout';

export function Navigation() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const [error, setError] = useState('');


  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    try {
      await logoutUser();
      window.location.href = '/login'; 
    } catch (err: any) {
      setError(err.message); 
    }
  };

  const links = [
    { label: t('criaturas'), href: { pathname: '/perfiles/criaturas' } }, 
    { label: t('perfil'), href: { pathname: '/perfiles/perfil' } },       
    { label: t('sesion'), href: '#', onClick: handleLogout },             
  ];

  return (
    <header className={style['navigation']}>
      <nav className={style['navigation__nav']}>
        <h1 className={style['navigation__title']}>{t('titulo')}</h1>
        <ul className={style['navigation__nav__ul']}>
          {links.map(({ label, href, onClick }, index) => {
            const hrefPath = typeof href === 'string' ? href : href.pathname; 
            return (
              <li key={index} className={style['navigation__nav__li']}>
                {onClick ? (
                  <a 
                    href={hrefPath}
                    onClick={onClick} 
                    className={style['navigation__link']}
                  >
                    {label}
                  </a>
                ) : (
                  <Link 
                    href={href} 
                    className={`${style['navigation__link']} ${
                      pathname && pathname.includes(hrefPath) ? style['navigation__link--active'] : ''
                    }`}
                  >
                    {label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
        {error && <p className={style['navigation__error']}>{error}</p>}
      </nav>
    </header>
  );
}
