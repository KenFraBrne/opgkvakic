import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import MainLayout from 'layout/MainLayout';
import PostCard from 'component/PostCard';

import getServerData from 'util/getServerData';

const NewsPage = () => {

  // posts
  const { posts } = getServerData('/api/posts');
  const isLoading = posts ? false : true;

  // post cards
  let postCards = posts && posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(post => {
      const props = { post };
      return <PostCard {...props}/>
    });

  return (
    <MainLayout isLoading={isLoading}>
      <Container fluid style={{maxWidth: '85%'}}>
        <h1>Novosti</h1>
        <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3">
          {postCards}
        </Row>
      </Container>
    </MainLayout>
  )
}

export default NewsPage;
