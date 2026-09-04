import { NavLink } from "react-router";
import styles from "./Navbar.module.css";

const linkClass = ({ isActive }) => (isActive ? styles.active : undefined);

export default function Navbar() {
  return (
    <nav className={styles.siteNav}>
      <NavLink className={styles.brand} to="/">
        mellemrum<span>.</span>
      </NavLink>
      <div className={styles.navLinks}>
        <NavLink className={linkClass} to="/">Events</NavLink>
        <NavLink className={linkClass} to="/om">Om Mellemrum</NavLink>
      </div>
    </nav>
  );
}
