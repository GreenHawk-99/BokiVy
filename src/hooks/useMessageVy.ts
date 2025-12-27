import {useContext} from 'react';
import {MessageContext} from "../contexts/MessageContext.ts";

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
