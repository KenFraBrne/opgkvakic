import React from 'react';

import { useContext } from 'react';
import { LanguageContext } from 'context/Language';

import Container from 'react-bootstrap/Container';

import MainLayout from 'layout/MainLayout'
import ContactForm from 'component/Forms/Contact';

export default function ContactPage() {
  // language change
  const { language } = useContext(LanguageContext);
  const content = language.content.pages.about.contact;
  // render
  return (
    <MainLayout>
      <Container fluid style={{maxWidth: 700}}>
        <h1>{ content.h1 }</h1>
        <ContactForm {...{language}}/>
      </Container>
    </MainLayout>
  )
}
