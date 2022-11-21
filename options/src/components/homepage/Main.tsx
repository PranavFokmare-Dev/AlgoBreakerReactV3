import React, { FC, useEffect, useState } from 'react';
import { getAnalytics } from '../../services/mockanalytics';
import { IAnalyticsSummary } from '../../utils/models';
import Card from '../cards/Card';
import Overview from './Overview';
import TodaysStats from './TodaysStats';

const Main = function () {
    const [analytics,setAnalytics] = useState<IAnalyticsSummary>({});
    useEffect(()=>{
        getAnalytics().then(d => {setAnalytics(d)});
    },[]);
    const display = JSON.stringify(analytics);
    const {urls,launches,timeSpent} = getTotalLaunches(analytics);
    console.log("ANALYTICS213");
    console.log(analytics[dateKey(Date.now())]);
  return (
    <div className='homepage-main-container'>
        
         <TodaysStats launches={launches} timeSpent={timeSpent}/>
        <Overview urls={urls} urlSumarry = {analytics[dateKey(Date.now())]} totalTimeSpent={timeSpent}/>
    </div>
  );
};

export default Main;

function getTotalLaunches(summary:IAnalyticsSummary){
    let launches = 0;
    let timeSpent = 0;
    let todaysSummary = summary[dateKey(Date.now())]
    if(todaysSummary==null){
        todaysSummary = {"NoData":{launches:0,timeSpent:0}};
    }
    const urls = Object.keys(todaysSummary);
    console.log(urls);
    urls.forEach(url =>{ launches+=todaysSummary[url].launches;
    timeSpent+=todaysSummary[url].timeSpent;
    });
    return {urls,launches,timeSpent};
}

function dateKey(jsDateNow:number):string{
    const d = new Date(jsDateNow);
    return `${d.getDate()}_${d.getMonth()}_${d.getFullYear()}`;
  }
