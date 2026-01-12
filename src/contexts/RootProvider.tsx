import {ThemeProvider} from "./ThemeProvider.tsx";
import {UserProvider} from "./UserProvider.tsx";
import {MessageProvider} from "./MessageProvider.tsx";
import {DataProvider} from "./DataContext.tsx";
import {App} from "../App.tsx";
import {ConfigProvider} from "./ConfigProvider.tsx";


/**
 * Root provider that aggregates all application-level contexts.
 */
export const RootProvider = () => {
  return (
    <ConfigProvider>
      <ThemeProvider>
        <UserProvider>
          <MessageProvider>
            <DataProvider>
              <App/>
            </DataProvider>
          </MessageProvider>
        </UserProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
};
