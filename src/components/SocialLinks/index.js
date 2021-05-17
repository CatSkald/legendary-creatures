import {
  socialLinks,
  socialLinks__item,
  socialLinks__link,
} from "./index.module.scss";

import React from "react";
import { Github } from "@styled-icons/boxicons-logos/Github";

const SocialLinks = () => {
  return (
    <ul className={socialLinks}>
      <li className={socialLinks__item}>
        <a
          className={socialLinks__link}
          href="https://github.com/CatSkald/legendary-creatures"
          title="Github"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
        </a>
      </li>
    </ul>
  );
};

export default SocialLinks;
