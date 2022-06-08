import {
  card__container,
  card,
  card__image,
  card__title,
  card__content,
  card__header,
  card__row,
  card__row__item,
  card__buttons,
  card__hint,
  card__image__container,
  card__image__copyright,
  card__image__copyright__info,
  card__section,
} from "./index.module.scss";

import React from "react";
import PropTypes from "prop-types";
import { GatsbyImage } from "gatsby-plugin-image";

import { Wikipedia } from "@styled-icons/boxicons-logos/Wikipedia";
import { InfoCircleFill } from "@styled-icons/bootstrap/InfoCircleFill";
import { Imdb } from "@styled-icons/simple-icons/Imdb";
import { Youtube2 } from "@styled-icons/icomoon/Youtube2";

import useTranslations from "../../i18n/translations/useTranslations";
import { useImages } from "../../hooks/use-images";
import LocalizedLink from "../LocalizedLink";
import { LocaleContext } from "../Layout";
import { noTag } from "../../configuration";
import { supportedTags } from "../../i18n/navigation";
import { localizedSort } from "../../utils/array-helpers";
import { getImageNameOrDefaultCover } from "../../utils/image-helpers";
import { getCreatureUrl, getNameFromPath } from "../../utils/url-helpers";
import { getTagUrl, getTagValueUrl } from "../../utils/url-helpers";

const CreatureCard = (props) => {
  const translations = useTranslations();
  const { language } = React.useContext(LocaleContext);

  const imageName = getImageNameOrDefaultCover(props.frontmatter.image);
  const images = useImages();
  const image = images.find((img) => img.name === imageName);

  //TODO move this inside image?
  const imageAttribution = props.frontmatter.external_references
    ? props.frontmatter.external_references.find(
        (x) => x.type === "Image attribution",
      )
    : null;

  return (
    <div className={card__container}>
      <div className={card}>
        <div className={card__image__container}>
          <GatsbyImage
            className={card__image}
            image={image.image}
            alt={props.frontmatter.title}
          />
          {imageAttribution && (
            <>
              <InfoCircleFill className={card__image__copyright__info} />
              <div
                className={card__image__copyright}
                dangerouslySetInnerHTML={{
                  __html: imageAttribution.reference_html,
                }}
              ></div>
            </>
          )}
        </div>
        <table className={card__content}>
          <caption className={card__title}>
            <span>{props.frontmatter.title}</span>
            <CardBadges data={props.frontmatter} />
          </caption>
          <tbody>
            {localizedSort(
              supportedTags.map((tag) => ({
                tag: translations[tag],
                values: props.frontmatter[tag],
              })),
              language.code,
              (x) => x.tag,
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

const CardBadges = (props) => {
  return <></>; //TODO
};

const CardRow = (props) => {
  if (!props.data) return null;

  let data = Array.isArray(props.data) ? props.data : [props.data];
  data = data.filter((x) => x && x.value !== noTag);
  if (data.length === 0) return null;

  data = localizedSort(data, props.language.code, (x) => x.value);
  const tagUrl = getTagUrl(props.tag, props.language.code);

  return (
    <tr>
      <th className={card__header}>
        <LocalizedLink to={tagUrl}>{props.tag}</LocalizedLink>
      </th>
      <td className={card__row}>
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
            <span key={props.tag + index} className={card__row__item}>
              <LocalizedLink to={tagValueUrl}>{category.value}</LocalizedLink>
              <span className={card__hint}>
                {comment ? ` (${comment})` : ""}
              </span>
            </span>
          );
        })}
      </td>
    </tr>
  );
};

const RelatedCreatures = (props) => {
  if (!props.data.related || props.data.related.length === 0) return <></>;

  let creatureLinks = props.data.related.map((path) => {
    var name = getNameFromPath(path).name;
    return {
      name: name, //TODO capitalization
      link: getCreatureUrl(name, props.language.code),
    };
  });
  creatureLinks = localizedSort(
    creatureLinks,
    props.language.code,
    (x) => x.name,
  );

  return (
    <tr>
      <th className={card__header}>{props.label}</th>
      <td className={card__row}>
        {creatureLinks.map(({ name, link }) => (
          <span className={card__row__item} key={name}>
            <LocalizedLink to={link}>{name}</LocalizedLink>
          </span>
        ))}
      </td>
    </tr>
  );
};

const CardButtons = (props) => {
  const findButton = (type) => {
    const result =
      props.data.external_references &&
      props.data.external_references.find(
        (x) => x.type === type && x.reference_url,
      );

    if (result)
      return {
        type: type,
        href: result.reference_url,
        title: result.description ? `${type}: ${result.description}` : type,
      };
    else return null;
  };

  //TODO add other types
  const wikipedia = findButton("Wikipedia");
  const imdb = findButton("IMDB");
  const youtube = findButton("YouTube");

  if (!wikipedia && !imdb) return <></>;

  return (
    <div className={`${card__section} ${card__buttons}`}>
      {wikipedia && (
        <a
          href={wikipedia.href}
          title={wikipedia.title}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Wikipedia />
        </a>
      )}
      {imdb && (
        <a
          href={imdb.href}
          title={imdb.title}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Imdb />
        </a>
      )}
      {youtube && (
        <a
          href={youtube.href}
          title={youtube.title}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Youtube2 />
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
