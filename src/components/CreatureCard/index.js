import styles from "./index.module.scss";

import React from "react";
import useTranslations from "../useTranslations";

const CreatureCard = ({ frontmatter }) => {
  const translations = useTranslations();

  return (
    <div className={styles.Container}>
      <div className={styles.Card}>
        <table className={styles.Info}>
          <caption className={styles.Title}>
            {frontmatter.title}
          </caption>
          <tbody>
            <CardRow header="Plural" data={frontmatter.plural} />
            <CardRow header="Number" data={frontmatter.number} />
            <CardRow header="Origin" data={frontmatter.origin} />
            <CardRow header="Habitat" data={frontmatter.habitat} />
            <CardRow
              header="Categories"
              data={frontmatter.categories}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CardRow = props => {
  return (
    <tr>
      <th className={styles.InfoHeader}>{props.header}</th>
      <td className={styles.InfoRow}>
        {Array.isArray(props.data)
          ? props.data.join(", ")
          : props.data}
      </td>
    </tr>
  );
};

export default CreatureCard;
