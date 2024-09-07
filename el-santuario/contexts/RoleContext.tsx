"use client"; 

import React, { createContext, useContext, useState } from 'react';

type Role = 'cuidador' | 'maestro';

interface RoleContextProps {
  role: Role;
  setRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextProps | undefined>(undefined);

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {

  const [role, setRole] = useState<Role>('cuidador');

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole debe ser usado dentro de un RoleProvider');
  }
  return context;
};
