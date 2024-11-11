import { useState } from "react";
import Header from "../../components/Header/Header";
import { formLoginContext } from "../useContext";
const Main = (pops) => {
  const [formLogin, setFormLogin] = useState(false);

  return (
    <>
      <formLoginContext.Provider value={{ formLogin, setFormLogin }}>
        <Header />
        {pops.children}
      </formLoginContext.Provider>
    </>
  );
};

export default Main;
