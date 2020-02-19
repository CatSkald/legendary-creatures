import styles from "./index.module.scss";

import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import LocalizedLink from "../LocalizedLink";
import { useImages } from "../../hooks/use-images";

const CreaturePage = props => {
  const imagePath = props.image;

  const imageName = imagePath
    ? imagePath.slice(
        imagePath.lastIndexOf("/") + 1,
        imagePath.length,
      )
    : "cover.jpg";

  const images = useImages();
  const image = images.find(img => img.originalName === imageName);

  return (
    <LocalizedLink
      className={styles.CreaturePageLink}
      to={props.slug}
    >
      <section className={styles.CreaturePreviewContainer}>
        <Img
          className={styles.CreaturePageImage}
          fluid={image}
          alt={props.title}
        />
        <div className={styles.CreatureInfo}>
          <h1 className={styles.PageTitle}>{props.title}</h1>
          <p className={styles.PageDescription}>
            {props.description}
          </p>
        </div>
      </section>
    </LocalizedLink>
  );
};

CreaturePage.propTypes = {
  slug: PropTypes.string.isRequired,
  category: PropTypes.array.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default CreaturePage;
