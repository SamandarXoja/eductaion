import React, { useRef } from "react";
import { useClickAway } from "react-use";

import styles from "./Menu.module.scss";

function Menu({
  button,
  children,
  isOpen = false,
  className = "",
  containerClassName,
  onClickOutside = () => {},
}) {
  const ref = useRef();

  useClickAway(ref, () => onClickOutside());

  return (
    <div className={`${styles.menuContainer} ${containerClassName}`} ref={ref}>
      {button}
      <ul
        className={`${styles.container} ${className} ${
          isOpen ? styles.show : ""
        }`}
      >
        {children}
      </ul>
    </div>
  );
}

export default Menu;
