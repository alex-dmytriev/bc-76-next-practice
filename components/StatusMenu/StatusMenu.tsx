"use client";

import Link from "next/link";
import { useState } from "react";
import css from "./StatusMenu.module.css";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
const statusList: string[] = [
  "All",
  "todo",
  "in-progress",
  "review",
  "done",
  "blocked",
  "canceled",
];

export default function StatusMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Tasks
        {isOpen ? <FaCaretUp /> : <FaCaretDown />}
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {statusList.map((item) => (
            <li className={css.menuItem} key={item}>
              <Link
                onClick={toggle}
                className={css.menuLink}
                href={`/tasks/filter/${item}`}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
