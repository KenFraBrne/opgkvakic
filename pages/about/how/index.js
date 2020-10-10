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
  //
  // render
  return (
    <MainLayout>
      <Container style={{ maxWidth: 800, padding: '0 5% 5% 5%' }}>
        <h1>{ language.content.pages.about.how.h1 }</h1>
        <p>
          Naše dostave se odvijaju vikendom na tjednoj bazi (a ponekad i srijedom) kada
          dostavljamo na vašu registriranu adresu. Sve dostave nastojimo vršiti unutar
          preodređenog vremenskog obrasca koji izabirete pri naručivanju.
        </p>
        <figure className="text-center pb-3">
          <img src="/about/how/berlingo.png" className="img-fluid"/>
          <figcaption className="figure-caption"> Berlingo </figcaption>
        </figure>
        <p>
          Jednom kada se nalazimo u blizini vaše adrese, telefonski vas kontaktiramo i
          vršimo primopredaju. Ako vas unutar nekoliko minuta nismo u stanju kontaktirati,
          pretpostavljamo da niste u stanju preuzeti narudžbu. Vašu narudžbu u tom slučaju
          možete podići na našoj adresi.
        </p>
        <p className="pt-3">
          Područje u kojemu dostavljamo predočeno je ispod, unutar kojeg možete prijaviti
          vašu adresu.
        </p>
        <Container>
          <DeliveryMap />
        </Container>
      </Container>
    </MainLayout>
  )
}

export default AboutDeliveriesPage;
