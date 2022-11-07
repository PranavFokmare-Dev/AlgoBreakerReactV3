import React, { FC, useEffect, useState } from 'react';
//import { getAnalytics } from '../services/analytics';
import { getAnalytics } from '../services/mockanalytics';
import { IAnalyticsSummary } from '../utils/models';

const Home: FC = () => {
    const [analytics,setAnalytics] = useState<IAnalyticsSummary>({});
    useEffect(()=>{
        getAnalytics().then(d => {setAnalytics(d)});
    },[]);
    const display = JSON.stringify(analytics);
  return (
    <div>
        <h1>hello from not home</h1>
        <p>
            {display}
        </p>
    </div>
  );
};

export default Home;
