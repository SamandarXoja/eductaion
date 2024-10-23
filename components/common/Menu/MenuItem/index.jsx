import React from "react";

import { User } from "lucide-react";

import styles from "./MenuItem.module.scss";

export default function MenuItem({
  textClassName = "",
  text,
  onClick,
  className = "",
  children = null,
  icon,
  ...props
}) {
  return (
    <li
      className={` ${className} ${styles.container}`}
      onClick={onClick}
      {...props}
    >
      {icon}
      <div className={`${styles.text} ${textClassName}`}>{text}</div>
    </li>
  );
}
