"use client";

import React from 'react';
import { RoleProvider } from '@/contexts/RoleContext';
import '@/styles/globals.scss';

export default function cuidadorLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleProvider>
      {children}
    </RoleProvider>
  );
}
