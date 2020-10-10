import React from 'react';

import dynamic from 'next/dynamic';

import { useContext } from 'react';
import { LanguageContext } from 'context/Language';

import Container from 'react-bootstrap/Container';

import MainLayout from 'layout/MainLayout'

const DeliveryMap = dynamic(
  () => import('component/DeliveryMap'),
  { ssr: false }
)

function AboutDeliveriesPage() {
  // language change
  const { language } = useContext(LanguageContext);
  const content = language.content.pages.about.how;
  //
  // render
  return (
    <MainLayout>
      <Container style={{ maxWidth: 700, padding: '0 5% 5% 5%' }}>
        <h1>{ content.h1 }</h1>
        <p> { content.p[0] } </p>
        <figure className="text-center p-3">
          <img
            className="img-fluid"
            srcSet={[
              require('public/about/how/berlingo.png?webp'),
              require('public/about/how/berlingo.png')
            ].join(', ')}/>
          <figcaption className="figure-caption"> { content.figcaption[0] } </figcaption>
        </figure>
        <p> { content.p[1] } </p>
        <figure className="text-center p-3">
          <DeliveryMap />
          <figcaption className="figure-caption"> { content.figcaption[1] } </figcaption>
        </figure>
      </Container>
    </MainLayout>
  )
}

export default AboutDeliveriesPage;
