import React from 'react';
import axios from 'axios';

import HomePageComponent from '../components/Home';

const HomePage = ({ data }) => (
  <HomePageComponent data={data} />
);

export default HomePage;

export const getStaticProps = async () => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmY4ZDFmODAyYTFjNjAxZTAxYTRhMWQiLCJhY2NvdW50Ijp7Il9pZCI6IjYyZjhkMWY4MDJhMWM2MDFlMDFhNGExYiIsInNpdGUiOiI2MmY4ZDFmODAyYTFjNjAxZTAxYTRhMTQiLCJpc1ZhbGlkIjp0cnVlLCJ2YWxpZGl0eURhdGUiOiIyNTUwNDkxNjA0Njg1IiwiX192IjowfSwiaWF0IjoxNjk0MjU2NzQwfQ.kK0dedtLoJvy2BVs9-oRGWdKU7Vk_Kp2G_orWaVPgAs";
  try {
    const response = await axios.get('https://dev.ohmcare.tech:3030/62f8d1f802a1c601e01a4a14/rooms',
      { headers: { Authorization: `Bearer ${token}` } });

    return {
      props: { data: response.data },
      notFound: !response.data,
      revalidate: 10,
    };
  } catch (error) {
    return { notFound: true };
  }
};
