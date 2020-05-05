import styles from "./index.module.scss";

import React from "react";
import Img from "gatsby-image";
import useTranslations from "../../i18n/translations/useTranslations";
import { useImages } from "../../hooks/use-images";
import LocalizedLink from "../LocalizedLink";

const { getImageNameOrDefaultCover } = require("../../utils/image-helpers");

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
            <CardRow tag={translations.Number} data={frontmatter.number} />
            <CardRow tag={translations.Origin} data={frontmatter.origin} />
            <CardRow tag={translations.Habitat} data={frontmatter.habitat} />
            <CardRow
              tag={translations.Categories}
              data={frontmatter.categories}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CardRow = props => {
  var data = Array.isArray(props.data) ? props.data : [props.data];
  const { getTagUrl, getTagValueUrl } = require("../../utils/url-helpers");
  const tagUrl = getTagUrl(props.tag);

  return (
    <tr>
      <th className={styles.InfoHeader}>
        <LocalizedLink key={props.tag} to={tagUrl} navigateOnClick={true}>
          {props.tag}
        </LocalizedLink>
      </th>
      <td className={styles.InfoRow}>
        {data.map((value, index) => {
          const tagValueUrl = getTagValueUrl(props.tag, value);
          return (
            <LocalizedLink
              key={props.tag + index.toString()}
              to={tagValueUrl}
              navigateOnClick={true}
            >
              {value}
            </LocalizedLink>
          );
        })}
      </td>
    </tr>
  );
};

export default CreatureCard;
