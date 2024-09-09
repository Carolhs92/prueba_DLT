import React from 'react';
import Image from 'next/image';
import style from '@/styles/imge.module.scss';

interface SidebarImageProps {
  src: string; 
}

export const SidebarImage: React.FC<SidebarImageProps> = ({ src }) => {
  return (
    <div className={style['image-container']}>
      <Image src={src} alt='rol' width={800} height={800} className={style['image-container__image']} />
    </div>
  );
};
