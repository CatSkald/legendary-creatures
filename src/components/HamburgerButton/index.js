import styles from "./index.module.scss";

import React from "react";

export const HamburgerButton = props => {
  return (
    <button
      onClick={props.handleClick}
      className={`${styles.HamburgerButton} ${
        props.isActive ? styles.active : ""
      }`}
    >
      <span></span>
    </button>
  );
};

export default HamburgerButton;
