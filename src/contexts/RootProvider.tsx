import React, { ReactNode } from 'react';
import { MessageProvider } from './MessageContext';
import { DataProvider } from './DataContext';
import { UserProvider } from './UserContext';
import { ThemeProvider } from './ThemeContext';

/**
 * Root provider that aggregates all application-level contexts.
 */
export const RootProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <UserProvider>
        <MessageProvider>
          <DataProvider>
            {children}
          </DataProvider>
        </MessageProvider>
      </UserProvider>
    </ThemeProvider>
  );
};
