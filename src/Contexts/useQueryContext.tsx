import { createContext, useContext, useState } from "react";

interface IQueryContext {
  query: string;
  setQuery: (query: string) => void;
}

const QueryContext = createContext({} as IQueryContext);

export const useQueryContext = () => {
  return useContext(QueryContext);
};

export default function AppQueryProvider({ children }: IReactFcProps) {
  const [query, setQuery] = useState("");
  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      {children}
    </QueryContext.Provider>
  );
}
