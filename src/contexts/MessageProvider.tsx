import React, {ReactNode} from 'react';
import {message} from 'antd';
import {MessageSammanhang} from "./AppContext.ts";


/**
 * Provider component for Ant Design message API.
 */
export const MessageProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <MessageSammanhang.Provider value={{messageApi}}>
      {contextHolder}
      {children}
    </MessageSammanhang.Provider>
  );
};

