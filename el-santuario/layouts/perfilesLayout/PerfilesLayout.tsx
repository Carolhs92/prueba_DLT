"use client";

import React from 'react';
import { RoleProvider } from '@/contexts/RoleContext';
import { cuidadorContent } from './cuidadorContent';
import '@/styles/globals.scss';

export default function cuidadorLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleProvider>
      <cuidadorContent>{children}</cuidadorContent>
    </RoleProvider>
  );
}
