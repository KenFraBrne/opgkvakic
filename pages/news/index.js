import React from 'react';

import Head from 'next/head';
import Link from 'next/link';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MainLayout from 'layout/MainLayout';

const NewsPage = ({posts}) => {

  let cards = posts
    .slice(0)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(post => {
      const date = new Date(post.date);
      const dateString = date.toLocaleString([],{
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      return (
        <Link
          key={post.id}
          href="news/[id]"
          as={`news/${post.id}`}
          passHref>
          <Col as="a" className="my-1">
            <Card className="h-100" style={{textDecoration: 'none'}}>
              <Card.Img variant="top" src={post.images[0]} className="img-fluid"/>
              <Card.Body className="d-flex flex-column">
                <Card.Title className="flex-grow-1">{post.title}</Card.Title>
                <Card.Footer>{dateString}</Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        </Link>
      )
    });

  return (
    <MainLayout>
      <Container fluid style={{maxWidth: '85%'}}>
        <h1>Novosti</h1>
        <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3">
          {cards}
        </Row>
      </Container>
    </MainLayout>
  )
}

export async function getStaticProps(){
  let posts = await require('data/posts.json');
  return {
    props: {
      posts: posts
    }
  }
}

export default NewsPage;
