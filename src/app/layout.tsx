import { Poppins } from 'next/font/google';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CourseTree',
  description:
    'Visualiza tu Plan de Estudios de manera interactiva con CourseTree',
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
    <html lang="en" className="poppins.classname">
      <body>{children}</body>
    </html>
  );
}
