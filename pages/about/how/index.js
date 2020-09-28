import React from 'react';

import { useContext } from 'react';
import { LanguageContext } from 'context/Language';

import Container from 'react-bootstrap/Container';

import MainLayout from 'layout/MainLayout'

export default function HomePage() {
  
  // language change
  const { language } = useContext(LanguageContext);

  return (
    <MainLayout>

      <Container fluid style={{maxWidth: 600, textAlign: 'justify'}}>

        <h1>{ language.content.pages.about.how.h1 }</h1>

        <p>This is not to discredit the idea that some 
          posit the teenage layer to be less than cloying. 
          Some assert that a grandfather is a jump's 
          quotation. Gifted classes show us how broccolis 
          can be chills.</p>

        <p>Framed in a different way, the certification 
          of a gymnast becomes an acock frog. However, the 
          chiselled seashore comes from an algoid heaven. A 
          college is a cathedral from the right 
          perspective. We know that before precipitations, 
          pests were only epoches. Though we assume the 
          latter, one cannot separate owls from uncheered 
          units.</p>

        <p>Yarest bottles show us how acoustics can be 
          vacuums. The first flamy shoulder is, in its own 
          way, a booklet. Missiles are falcate numerics. 
          Commas are osmous pets. A peace of the velvet is 
          assumed to be a dissolved fowl.</p>

      </Container>

    </MainLayout>
  )
}
