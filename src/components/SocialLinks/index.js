import styles from "./index.module.scss";

import React from "react";
import { Github } from "styled-icons/boxicons-logos/Github";

const SocialLinks = () => {
  return (
    <ul className={styles.SocialLinksList}>
      <li className={styles.SocialLinksItem}>
        <a
          className={styles.SocialLinksLink}
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
