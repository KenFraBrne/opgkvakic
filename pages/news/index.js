import React from 'react';

import Link from 'next/link';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MainLayout from 'layout/MainLayout';

import getServerData from 'util/getServerData';

const NewsPage = () => {

  // posts
  const { posts } = getServerData('/api/posts');
  const isLoading = posts ? false : true;

  // cards
  let cards = posts && posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
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
          key={post._id}
          href="news/[_id]"
          as={`news/${post._id}`}
          passHref>
          <Col as="a" className="my-1">
            <Card className="h-100" style={{textDecoration: 'none'}}>
              <Card.Img
                variant="top"
                srcSet={[
                  require(`pages/images${post.images[0]}?webp`),
                  require(`pages/images${post.images[0]}`),
                ].join(', ')}
                className="img-fluid"/>
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
    <MainLayout isLoading={isLoading}>
      <Container fluid style={{maxWidth: '85%'}}>
        <h1>Novosti</h1>
        <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3">
          {cards}
        </Row>
      </Container>
    </MainLayout>
  )
}

export default NewsPage;
