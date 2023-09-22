import React, { ReactNode } from 'react';
import { MantineCustomThemeProvider } from 'tp-kit/components';
import { NextFont } from 'next/dist/compiled/@next/font';

interface ProvidersProps {
  font: NextFont;
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ font, children }) => {

  return (
    <MantineCustomThemeProvider font={font}>
      {children}
    </MantineCustomThemeProvider>
  );
};

export default Providers;