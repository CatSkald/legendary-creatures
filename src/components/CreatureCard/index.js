import styles from "./index.module.scss";

import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import useTranslations from "../../i18n/translations/useTranslations";
import { useImages } from "../../hooks/use-images";
import LocalizedLink from "../LocalizedLink";
import { LocaleContext } from "../Layout";
import { Wikipedia } from "@styled-icons/boxicons-logos/Wikipedia";
const { noTag } = require("../../configuration");
const { supportedTags } = require("../../i18n/navigation");

const { localizedSort } = require("../../utils/array-helpers");
const { getImageNameOrDefaultCover } = require("../../utils/image-helpers");
const { getCreatureUrl, getNameFromPath } = require("../../utils/url-helpers");

const CreatureCard = props => {
  const translations = useTranslations();
  const { language } = React.useContext(LocaleContext);

  const imageName = getImageNameOrDefaultCover(props.frontmatter.image);
  const images = useImages();
  const image = images.find(img => img.originalName === imageName);

  return (
    <div className={styles.Container}>
      <div className={styles.Card}>
        <Img
          className={styles.CardImage}
          fluid={image.fluid}
          alt={props.frontmatter.title}
        />
        <table className={styles.Info}>
          <caption className={styles.Title}>
            <span>{props.frontmatter.title}</span>
          </caption>
          <tbody>
            {localizedSort(
              supportedTags.map(tag => ({
                tag: translations[tag],
                values: props.frontmatter[tag],
              })),
              language.code,
              x => x.tag,
            ).map(({ tag, values }) => (
              <CardRow
                tag={tag}
                data={values}
                language={language}
                sometimesText={translations["sometimes"]}
                key={tag}
              />
            ))}
            <RelatedCreatures
              data={props.frontmatter}
              label={translations.related}
              language={language}
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
  data = data.filter(x => x && x.value !== noTag);
  if (data.length === 0) return null;

  data = localizedSort(data, props.language.code, x => x.value);
  const { getTagUrl, getTagValueUrl } = require("../../utils/url-helpers");
  const tagUrl = getTagUrl(props.tag, props.language.code);

  return (
    <tr>
      <th className={styles.InfoHeader}>
        <LocalizedLink to={tagUrl}>{props.tag}</LocalizedLink>
      </th>
      <td className={styles.InfoRow}>
        {data.map((category, index) => {
          const tagValueUrl = getTagValueUrl(
            props.tag,
            category.value,
            props.language.code,
          );

          let comment = "";
          if (category.comment && category.sometimes)
            comment = `${props.sometimesText}, ${category.comment}`;
          else if (category.comment) comment = category.comment;
          else if (category.sometimes) comment = props.sometimesText;

          return (
            <span key={props.tag + index} className={styles.InfoRowEntry}>
              <LocalizedLink to={tagValueUrl}>{category.value}</LocalizedLink>
              <span className={styles.Hint}>
                {comment ? ` (${comment})` : ""}
              </span>
            </span>
          );
        })}
      </td>
    </tr>
  );
};

const RelatedCreatures = props => {
  if (!props.data.related || props.data.related.length === 0) return <></>;

  let creatureLinks = props.data.related.map(path => {
    var name = getNameFromPath(path).name;
    return {
      name: name, //TODO capitalization
      link: getCreatureUrl(name, props.language.code),
    };
  });
  creatureLinks = localizedSort(
    creatureLinks,
    props.language.code,
    x => x.name,
  );

  return (
    <tr>
      <th className={styles.InfoHeader}>{props.label}</th>
      <td className={styles.InfoRow}>
        {creatureLinks.map(({ name, link }) => (
          <span className={styles.InfoRowEntry} key={name}>
            <LocalizedLink to={link}>{name}</LocalizedLink>
          </span>
        ))}
      </td>
    </tr>
  );
};

const CardButtons = props => {
  const anyButtons = props.data.wikipedia;
  if (!anyButtons) return <></>;

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

const languageShape = {
  code: PropTypes.string.isRequired,
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
  language: PropTypes.shape(languageShape).isRequired,
  sometimesText: PropTypes.string.isRequired,
};

CardButtons.propTypes = {
  data: PropTypes.object.isRequired,
};

RelatedCreatures.propTypes = {
  label: PropTypes.string.isRequired,
  language: PropTypes.shape(languageShape).isRequired,
  data: PropTypes.shape({
    related: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
};

export default CreatureCard;
