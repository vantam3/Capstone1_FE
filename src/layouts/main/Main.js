import Header from "../../components/Header/Header";

const Main = (pops) => {
  return (
    <>
      <Header />
      {pops.children}
    </>
  );
};

export default Main;
