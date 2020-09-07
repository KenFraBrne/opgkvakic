import React from 'react';

import Head from 'next/head';
import Link from 'next/link';

import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import NavLink from 'react-bootstrap/NavLink';

import MainLayout from 'layout/MainLayout';

import { FiArrowLeft } from 'react-icons/fi';

const PostPage = ({post}) => {

  const date = new Date(post.date);
  const dateString = date.toLocaleString([],{
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <MainLayout>

      <Container fluid style={{maxWidth: 600, textAlign: 'justify'}} >

        <Link href="/news" passHref>
          <NavLink className="px-0 py-3">
            <FiArrowLeft size="1.5em"/> Nazad
          </NavLink>
        </Link>

        <h1>{post.title}</h1>
        <p> <em>{dateString}</em> </p>

        <Carousel >
          {post.images.map(( image, i ) => (
            <Carousel.Item key={i}>
              <img src={image} className="img-fluid"/>
            </Carousel.Item>
          ))}
        </Carousel>

        <br />

        {post.body.split('\n').map(( par, i ) => <p key={i}>{ par }</p>)}

      </Container>

    </MainLayout>
  )
}

export async function getStaticPaths(){
  const posts = await require('data/posts.json');
  const ids = posts.map(post => post.id);
  const paths = ids.map(id => (
    { params: { id } }
  ));
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({params}){
  let posts = await require('data/posts.json');
  let post = posts.filter(post => post.id === params.id)[0];
  return {
    props: {
      post
    }
  }
}

export default PostPage;
