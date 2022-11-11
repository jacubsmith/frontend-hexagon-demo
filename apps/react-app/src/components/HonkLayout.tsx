import { Link } from "react-router-dom";
import honkLogo from "../assets/new-logo.svg";
// import "./HonkLayout.scss";

/**
 *
 * @param root0
 * @param root0.header
 * @param root0.main
 */
function HonkLayout({ header, main }) {
  return (
    <div className="container">
      <header>
        <nav>
          <ul>
            <li>
              <h1>
                <Link to="/home">
                  <img src={honkLogo} alt="" /> Honk
                </Link>
              </h1>
            </li>
          </ul>
          {header}
        </nav>
      </header>
      <main>{main}</main>
    </div>
  );
}
export default HonkLayout;
