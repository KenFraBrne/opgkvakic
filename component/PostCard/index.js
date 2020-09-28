import React from 'react';

import Link from 'next/link';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

export default function PostCard({ post }){

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
      href="posts/[_id]"
      as={`posts/${post._id}`}
      passHref>
      <Col as="a" className="my-1">
        <Card className="h-100" style={{textDecoration: 'none'}}>
          <Card.Img
            variant="top"
            srcSet={[
              require(`public/${post.images[0]}?webp`),
              require(`public/${post.images[0]}`),
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
}
