import React from 'react';
import Image from 'next/image';
import style from '@/styles/imge.module.scss';

interface SidebarImageProps {
  imageSrc?: string;  
  role?: 'cuidador' | 'maestro';  
}

const roleImages = {
  cuidador: '/assets/caretaker.png',
  maestro: '/assets/master.png'
};

export const SidebarImage: React.FC<SidebarImageProps> = ({ imageSrc, role = 'cuidador' }) => {
  const imageToShow = imageSrc || roleImages[role];

  return (
    <div className={style['image-container']}>
      <Image 
        src={imageToShow}
        alt={role === 'cuidador' ? 'Cuidador' : 'Maestro'} 
        width={800} 
        height={800} 
        className={style['image-container__image']} 
        priority 
      />
    </div>
  );
};
