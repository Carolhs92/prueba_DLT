"use client";

import React from 'react';
import { RoleProvider } from '@/contexts/RoleContext';
import { PerfilesContent } from './PerfilesContent';
import '@/styles/globals.scss';

export default function PerfilesLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleProvider>
      <PerfilesContent>{children}</PerfilesContent>
    </RoleProvider>
  );
}