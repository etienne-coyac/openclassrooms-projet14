import Header from "./components/Header";
import "./style/index.scss";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
