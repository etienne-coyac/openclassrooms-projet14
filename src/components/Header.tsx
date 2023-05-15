import { Link } from "react-router-dom";
import "../style/header.scss";

function Header() {
  return (
    <header id="header">
      <h1>HRNet</h1>
      <nav>
        <Link to="/">New</Link>
        <Link to="/employee-list">List</Link>
      </nav>
    </header>
  );
}

export default Header;
