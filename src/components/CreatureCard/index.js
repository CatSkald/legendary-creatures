import styles from "./index.module.scss";

import React from "react";
import useTranslations from "../../i18n/useTranslations";

const CreatureCard = ({ frontmatter }) => {
  const translations = useTranslations();

  return (
    <div className={styles.Container}>
      <div className={styles.Card}>
        <table className={styles.Info}>
          <caption className={styles.Title}>
            <span>{frontmatter.title}</span>
            <br />
            <span className={styles.Subtitle}>
              <span className={styles.SubtitleDescription}>
                {translations.plural}
              </span>
              {` ` + frontmatter.plural}
            </span>
          </caption>
          <tbody>
            <CardRow
              header={translations.Number}
              data={frontmatter.number}
            />
            <CardRow
              header={translations.Origin}
              data={frontmatter.origin}
            />
            <CardRow
              header={translations.Habitat}
              data={frontmatter.habitat}
            />
            <CardRow
              header={translations.Categories}
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
