import styles from "./index.module.scss";

import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import useTranslations from "../../i18n/translations/useTranslations";
import { useImages } from "../../hooks/use-images";
import LocalizedLink from "../LocalizedLink";
import { Wikipedia } from "styled-icons/boxicons-logos/Wikipedia";
const { noTag } = require("../../configuration");

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
            <CardRow
              tag={translations.Number}
              data={props.frontmatter.number}
            />
            <CardRow
              tag={translations.Origin}
              data={props.frontmatter.origin}
            />
            <CardRow
              tag={translations.Habitat}
              data={props.frontmatter.habitat}
            />
            <CardRow
              tag={translations.Taxonomy}
              data={props.frontmatter.taxonomy}
            />
            <CardRow
              tag={translations.Shapeshifting}
              data={props.frontmatter.shapeshifting}
            />
            <CardRow
              tag={translations.ActivityTime}
              data={props.frontmatter.activityTime}
            />
            <CardRow tag={translations.Voice} data={props.frontmatter.voice} />
            <CardRow
              tag={translations.Appearance}
              data={props.frontmatter.appearance}
            />
            <CardRow
              tag={translations.Clothes}
              data={props.frontmatter.clothes}
            />
            <CardRow
              tag={translations.Paraphernalia}
              data={props.frontmatter.paraphernalia}
            />
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
  data = data.filter(value => value && value !== noTag);
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
        {data.map((value, index) => {
          const tagValueUrl = getTagValueUrl(props.tag, value);
          return (
            <LocalizedLink key={props.tag + index} to={tagValueUrl}>
              {value}
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

CardRow.propTypes = {
  tag: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

CardButtons.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CreatureCard;
