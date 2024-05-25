import {ThemeProvider} from "./ThemeProvider.tsx";
import {UserProvider} from "./UserProvider.tsx";
import {MessageProvider} from "./MessageProvider.tsx";
import {DataProvider} from "./DataProvider.tsx";
import {App} from "../App.tsx";
import {ConfigProvider} from "./ConfigProvider.tsx";


/**
 * Root provider that aggregates all application-level contexts.
 */
export const RootProvider = () => {
  return (
    <ConfigProvider>
      <ThemeProvider>
        <MessageProvider>
          <UserProvider>
            <DataProvider>
              <App/>
            </DataProvider>
          </UserProvider>
        </MessageProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
};
