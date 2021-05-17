import {
  creaturePage__link,
  creaturePage__image,
  creaturePage,
  creaturePage__content,
  creaturePage__title,
  creaturePage__description,
} from "./index.module.scss";

import React from "react";
import PropTypes from "prop-types";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import LocalizedLink from "../LocalizedLink";
import { useImages } from "../../hooks/use-images";
import { getImageNameOrDefaultCover } from "../../utils/image-helpers";

const CreaturePage = (props) => {
  const imagePath = props.image;

  const imageName = getImageNameOrDefaultCover(imagePath);
  const images = useImages();
  const image = images.find((img) => img.name === imageName);

  return (
    <LocalizedLink className={creaturePage__link} to={props.slug}>
      <section className={creaturePage}>
        <GatsbyImage
          className={creaturePage__image}
          image={image.image}
          alt={props.title}
        />
        <div className={creaturePage__content}>
          <h3 className={creaturePage__title}>{props.title}</h3>
          <p className={creaturePage__description}>{props.description}</p>
        </div>
      </section>
    </LocalizedLink>
  );
};

CreaturePage.propTypes = {
  slug: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default CreaturePage;
