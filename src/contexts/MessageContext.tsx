import React, { createContext, useContext, ReactNode } from 'react';
import { message } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';

interface MessageContextType {
  messageApi: MessageInstance;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

/**
 * Provider component for Ant Design message API.
 */
export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <MessageContext.Provider value={{ messageApi }}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};

/**
 * Hook to use the global message API.
 */
export const useMessageVy = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessageVy must be used within a MessageProvider');
  }
  return context.messageApi;
};
