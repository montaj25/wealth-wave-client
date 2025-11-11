import React from 'react';
import HeroBanner from './HeroBanner';
import FinanceCardSections from './FinanceCardSections';
import Overview from './Overview';

const Home = () => {
    return (
        <div>
            <HeroBanner></HeroBanner>
            <Overview email="hero1@gmail.com"></Overview>
            <FinanceCardSections></FinanceCardSections>
        </div>
    );
};

export default Home;