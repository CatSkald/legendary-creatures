import styles from "./index.module.scss";

import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";

import LocalizedLink from "../LocalizedLink";
import { useImages } from "../../hooks/use-images";
import { getImageNameOrDefaultCover } from "../../utils/image-helpers";

const CreaturePage = (props) => {
  const imagePath = props.image;

  const imageName = getImageNameOrDefaultCover(imagePath);
  const images = useImages();
  const image = images.find((img) => img.originalName === imageName);

  return (
    <LocalizedLink className={styles.creaturePage__link} to={props.slug}>
      <section className={styles.creaturePage}>
        <Img
          className={styles.creaturePage__image}
          fluid={image.preview}
          alt={props.title}
        />
        <div className={styles.creaturePage__content}>
          <h3 className={styles.creaturePage__title}>{props.title}</h3>
          <p className={styles.creaturePage__description}>
            {props.description}
          </p>
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
