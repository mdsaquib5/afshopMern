import React from 'react'
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import BestSeller from '../components/BestSeller';
import Newsletter from '../components/Newsletter';
import PopularCategory from '../components/PopularCategory';
import Collections from '../components/Collections';

const Home = () => {
  return (
    <>
        <div className='mt-10'>
          <Hero />
          <Categories />
          <PopularCategory />
          <BestSeller />
          <Collections />
          <Newsletter />
        </div>
    </>
  )
}

export default Home;