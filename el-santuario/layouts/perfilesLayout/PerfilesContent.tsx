import React from 'react';
import { Navigation } from '@/components/Navigation';
import { SidebarImage } from '@/components/SidebarImage';
import { useRole } from '@/contexts/RoleContext';

export function cuidadorContent({ children }: { children: React.ReactNode }) {
  const { role } = useRole();
  const imageSrc = role === 'cuidador' ? '/assets/caretaker.png' : '/assets/master.png';

  return (
    <>
      <SidebarImage imageSrc={imageSrc} role={role} />
      <Navigation />
      {children}
    </>
  );
}