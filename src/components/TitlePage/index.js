import { title } from "./index.module.scss";

import React from "react";
import PropTypes from "prop-types";

const TitlePage = (props) => {
  return <h1 className={title}>{props.text}</h1>;
};

TitlePage.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TitlePage;
