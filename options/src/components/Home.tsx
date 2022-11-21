import React, { FC, useEffect, useState } from 'react';
//import { getAnalytics } from '../services/analytics';
import { getAnalytics } from '../services/mockanalytics';
import { IAnalyticsSummary } from '../utils/models';
import Card from './cards/Card';
import Main from './homepage/Main';

const Home: FC = () => {
    const [analytics,setAnalytics] = useState<IAnalyticsSummary>({});
    useEffect(()=>{
        getAnalytics().then(d => {setAnalytics(d)});
    },[]);
    const display = JSON.stringify(analytics);
  return (
    <div className='home-container'>
      <Main/>
    </div>
  );
};

export default Home;
