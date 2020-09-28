import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { useContext } from 'react';
import { LanguageContext } from 'context/Language';

import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import NavLink from 'react-bootstrap/NavLink';

import MainLayout from 'layout/MainLayout';

import { FiArrowLeft } from 'react-icons/fi';

import getServerData from 'util/getServerData';

const PostPage = () => {

  // query parameter
  const router = useRouter();
  const _id = router.query?._id;

  // get post data
  const { posts } = getServerData('/api/posts');
  const post = _id && posts && posts.find(post => post._id === _id);
  
  // language change
  const { language } = useContext(LanguageContext);

  // date string
  const date = post && new Date(post.date);
  const dateString = date && date.toLocaleString( language.lang ,{
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <MainLayout>

      <Container style={{maxWidth: 600}} >

        <Link href="/posts" passHref>
          <NavLink className="px-0 py-3 d-flex flex-row">
            <FiArrowLeft size="1.5em"/>
            <div className="pl-1"> { language.content.pages.posts._id } </div>
          </NavLink>
        </Link>

        <h1>{post?.title}</h1>
        <p> <em>{dateString}</em> </p>

        <Carousel >
          {post?.images.map(( image, i ) => (
            <Carousel.Item key={i}>
              <img
                srcSet={[
                  require(`public/${image}?webp`),
                  require(`public/${image}`),
                ].join(', ')}
                src={image}
                className="img-fluid"/>
            </Carousel.Item>
          ))}
        </Carousel>

        <br />

        {post?.body.split('\n').map(( par, i ) => <p key={i}>{ par }</p>)}

      </Container>

    </MainLayout>
  )
}

export default PostPage;
