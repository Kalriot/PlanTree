import { Poppins } from 'next/font/google';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PlanTree',
  description:
    'Visualiza tu Plan de Estudios de manera interactiva con PlanTree',
};

const poppins = Poppins({
  weight: '500',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body>{children}</body>
    </html>
  );
}
