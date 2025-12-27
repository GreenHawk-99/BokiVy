import React, {ReactNode} from 'react';
import {ThemeProvider} from "./ThemeProvider.tsx";
import {UserProvider} from "./UserProvider.tsx";
import {MessageProvider} from "./MessageProvider.tsx";
import {DataProvider} from "./DataContext.tsx";


/**
 * Root provider that aggregates all application-level contexts.
 */
export const RootProvider: React.FC<{ children: ReactNode }> = ({children}) => {
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
