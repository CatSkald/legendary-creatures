import styles from "./index.module.scss";

import React from "react";
import PropTypes from "prop-types";

export const HamburgerButton = (props) => {
  return (
    <button
      onClick={props.handleClick}
      className={`${styles.HamburgerButton} ${
        props.isActive ? styles.active : ""
      }`}
      aria-label="Show menu"
    >
      <span></span>
    </button>
  );
};

HamburgerButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default HamburgerButton;
