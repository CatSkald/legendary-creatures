import styles from "./index.module.scss";

import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import useTranslations from "../../i18n/translations/useTranslations";
import { useImages } from "../../hooks/use-images";
import LocalizedLink from "../LocalizedLink";
import { Wikipedia } from "styled-icons/boxicons-logos/Wikipedia";
const { noTag } = require("../../configuration");
const { forEachCreatureTag } = require("../../i18n/navigation");

const { getImageNameOrDefaultCover } = require("../../utils/image-helpers");

const CreatureCard = props => {
  const translations = useTranslations();

  const imageName = getImageNameOrDefaultCover(props.frontmatter.image);
  const images = useImages();
  const image = images.find(img => img.originalName === imageName);

  return (
    <div className={styles.Container}>
      <div className={styles.Card}>
        <Img
          className={styles.CardImage}
          fluid={image}
          alt={props.frontmatter.title}
        />
        <table className={styles.Info}>
          <caption className={styles.Title}>
            <span>{props.frontmatter.title}</span>
          </caption>
          <tbody>
            {forEachCreatureTag(tag => (
              <CardRow tag={translations[tag]} data={props.frontmatter[tag]} />
            ))}
          </tbody>
        </table>
        <CardButtons data={props.frontmatter} />
      </div>
    </div>
  );
};

const CardRow = props => {
  if (!props.data) return null;

  let data = Array.isArray(props.data) ? props.data : [props.data];
  data = data.filter(x => x && x.value !== noTag);
  if (data.length === 0) return null;

  const { getTagUrl, getTagValueUrl } = require("../../utils/url-helpers");
  const tagUrl = getTagUrl(props.tag);

  return (
    <tr>
      <th className={styles.InfoHeader}>
        <LocalizedLink key={props.tag} to={tagUrl}>
          {props.tag}
        </LocalizedLink>
      </th>
      <td className={styles.InfoRow}>
        {data.map((category, index) => {
          const tagValueUrl = getTagValueUrl(props.tag, category.value);
          return (
            <LocalizedLink key={props.tag + index} to={tagValueUrl}>
              {category.value}
            </LocalizedLink>
          );
        })}
      </td>
    </tr>
  );
};

const CardButtons = props => {
  return (
    <div className={styles.InfoButtons}>
      {props.data.wikipedia && (
        <a
          href={props.data.wikipedia}
          title="Wikipedia"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Wikipedia />
        </a>
      )}
    </div>
  );
};

CreatureCard.propTypes = {
  frontmatter: PropTypes.object.isRequired,
};

const categoryShape = {
  value: PropTypes.string.isRequired,
  comment: PropTypes.string,
  sometimes: PropTypes.bool,
};
CardRow.propTypes = {
  tag: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.shape(categoryShape),
    PropTypes.arrayOf(PropTypes.shape(categoryShape)),
  ]),
};

CardButtons.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CreatureCard;
