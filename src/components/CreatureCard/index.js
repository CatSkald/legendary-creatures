import styles from "./index.module.scss";

import React from "react";
import Img from "gatsby-image";
import useTranslations from "../../i18n/translations/useTranslations";
import { useImages } from "../../hooks/use-images";

const {
  getImageNameOrDefaultCover,
} = require("../../utils/image-helpers");

const CreatureCard = ({ frontmatter }) => {
  const translations = useTranslations();

  const imageName = getImageNameOrDefaultCover(frontmatter.image);
  const images = useImages();
  const image = images.find(img => img.originalName === imageName);

  return (
    <div className={styles.Container}>
      <div className={styles.Card}>
        <Img
          className={styles.CardImage}
          fluid={image}
          alt={frontmatter.title}
        />
        <table className={styles.Info}>
          <caption className={styles.Title}>
            <span>{frontmatter.title}</span>
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
