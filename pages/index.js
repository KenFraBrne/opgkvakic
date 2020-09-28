import React, { useContext } from 'react';

import Fade from 'react-reveal/Fade';

import Link from 'next/link';

import { LanguageContext } from 'context/Language';

import Container from 'react-bootstrap/Container';

import MainLayout from 'layout/MainLayout'

import styles from './styles.module.css';

export default function HomePage() {

  const { language } = useContext(LanguageContext);

  return (
    <MainLayout>

      <Fade>
        <div className={styles.row}>
          <div className={styles.colTxt}>
            <h2> {language.content.pages.index.row.h2} </h2>
            <p> {language.content.pages.index.row.p} </p>
          </div>
          <div className={styles.colImg}>
            <img
              srcSet={[
                require("public/intro/90901577_626949784816701_5041255869845602304_n.jpg?webp"),
                require("public/intro/90901577_626949784816701_5041255869845602304_n.jpg"),
              ].join(', ')}/>
          </div>
        </div>
      </Fade>

      <Fade>
        <div className={styles.wor}>
          <div className={styles.colImg}>
            <img
              srcSet={[
                require("public/intro/WhatsApp_Image_2020-03-28_at_10.07.07.jpeg?webp"),
                require("public/intro/WhatsApp_Image_2020-03-28_at_10.07.07.jpeg"),
              ].join(', ')}/>
          </div>
          <div className={styles.colTxt}>
            <h2> {language.content.pages.index.wor.h2} </h2>
            <p> {language.content.pages.index.wor.p} </p>
          </div>
        </div>
      </Fade>

    </MainLayout>
  )
}
