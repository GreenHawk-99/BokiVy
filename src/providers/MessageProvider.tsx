import {ReactNode} from 'react';
import {message} from 'antd';
import {MessageSammanhang} from "../contexts/AppContext.ts";


/**
 * Provider component for Ant Design message API.
 */
export const MessageProvider = ({children}: { children: ReactNode }) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <MessageSammanhang.Provider value={{messageApi}}>
      {contextHolder}
      {children}
    </MessageSammanhang.Provider>
  );
};

