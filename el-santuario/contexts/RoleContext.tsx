import React, { createContext, useState, useContext } from 'react';

type Role = 'cuidador' | 'maestro';

interface RoleContextType {
  role: Role;
  setRole: React.Dispatch<React.SetStateAction<Role>>;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>('cuidador');
  
  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}