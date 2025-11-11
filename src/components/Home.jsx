import React from 'react';
import HeroBanner from './HeroBanner';
import FinanceCardSections from './FinanceCardSections';
import Overview from './Overview';

const Home = () => {
    return (
        <div>
            <HeroBanner></HeroBanner>
            <Overview></Overview>
            <FinanceCardSections></FinanceCardSections>
        </div>
    );
};

export default Home;