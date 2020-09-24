import React from 'react';

import Fade from 'react-reveal/Fade';

import Link from 'next/link';

import MainLayout from 'layout/MainLayout'

import styles from './styles.module.css';

export default function HomePage() {
  return (
    <MainLayout>

      <Fade>
        <div className={styles.row}>
          <div className={styles.colTxt}>
            <h2> Dobrodošli </h2>
            <p> Pogledajte našu trenutnu <Link href="/order"><a>ponudu</a></Link> ili nas <Link href="/about"><a>upoznajte</a></Link>. </p>
          </div>
          <div className={styles.colImg}>
            <img src="/intro/90901577_626949784816701_5041255869845602304_n.jpg"/>
          </div>
        </div>
      </Fade>

      <Fade>
        <div className={styles.rowRev}>
          <div className={styles.colImg}>
            <img src="/intro/WhatsApp_Image_2020-03-28_at_10.07.07.jpeg"/>
          </div>
          <div className={styles.colTxt}>
            <h2> Dostave </h2>
            <p> Svježa roba dostavljena na vaša vrata svaki tjedan </p>
          </div>
        </div>
      </Fade>

    </MainLayout>
  )
}
