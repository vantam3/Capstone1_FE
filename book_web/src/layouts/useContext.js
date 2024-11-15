import { createContext, useContext } from "react";

export const formLoginContext = createContext({
  formLogin: false,
  setFormLogin: () => {},
});

export const useGlobalContextLogin  = () => useContext(formLoginContext);