"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import style from '@/styles/nav.module.scss';

export function Navigation() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();

  const links = [
    { label: t('criaturas'), href: { pathname: '/perfiles/criaturas' } },
    { label: t('perfil'), href: { pathname: '/perfiles/perfil' } },
    { label: t('sesion'), href: { pathname: '#' } },                      
  ];

  return (
    <header className={style['navigation']}>
      <nav className={style['navigation__nav']}>
        <h1 className={style['navigation__title']}>{t('titulo')}</h1>
        <ul className={style['navigation__nav__ul']}>
          {links.map(({ label, href }) => (
            <li key={href.pathname} className={style['navigation__nav__li']}>
              <Link href={href} className={`${style['navigation__link']} ${pathname === href.pathname ? style['navigation__link--active'] : ''}`}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
