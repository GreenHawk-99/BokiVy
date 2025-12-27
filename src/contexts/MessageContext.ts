import {createContext} from "react";
import {MessageInstance} from "antd/es/message/interface";

interface MessageContextType {
  messageApi: MessageInstance;
}

export const MessageContext = createContext<MessageContextType | undefined>(undefined);