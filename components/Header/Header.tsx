import Link from "next/link";
import Container from "../Container/Container";
import css from "./Header.module.css";
import StatusMenu from " @/components/StatusMenu/StatusMenu";

const Header = () => {
  return (
    <header className={css.header}>
      <Container>
        <nav>
          <ul className={css.list}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <StatusMenu />
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
