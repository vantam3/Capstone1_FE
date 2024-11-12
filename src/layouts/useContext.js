import { createContext, useContext, useState } from "react";

export const formLoginContext = createContext({
  formLogin: false,
  setFormLogin: () => { },
  user: null,
  setUser: () => { },
});

export const FormLoginProvider = ({ children }) => {
  const [formLogin, setFormLogin] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <formLoginContext.Provider value={{ formLogin, setFormLogin, user, setUser }}>
      {children}
    </formLoginContext.Provider>
  );
};

export const useGlobalContextLogin = () => useContext(formLoginContext);