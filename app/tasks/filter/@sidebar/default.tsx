import Link from "next/link";
import css from "./Sidebar.module.css";

const statusList: string[] = [
  "All",
  "todo",
  "in-progress",
  "review",
  "done",
  "blocked",
  "canceled",
];

const Sidebar = () => {
  return (
    <ul className={css.menuList}>
      {statusList.map((item) => (
        <li className={css.menuItem} key={item}>
          <Link className={css.menuLink} href={`/tasks/filter/${item}`}>
            {item}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
