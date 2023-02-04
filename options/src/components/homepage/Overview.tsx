import React, { FC, useEffect, useState } from 'react';
import { getAnalytics } from '../../services/mockanalytics';
import { IAnalyticsSummary, IUrlData } from '../../utils/models';
import Card from '../cards/Card';
import ListCard from '../cards/ListCard';
import Example from '../chart/Example';

const Overview = function ({ urls, urlSumarry, totalTimeSpent }: { urls: string[]; urlSumarry: IUrlData, totalTimeSpent:number }) {
  if(urlSumarry===undefined){
    return <h1>No data</h1>
  }
    urls = urls.sort((a, b) => {
    return urlSumarry[b].timeSpent - urlSumarry[a].timeSpent;
  });
  let top5urls = urls.slice(0,Math.min(urls.length,5));
  
  return (
    <>
      <h2 className="homepage-main-container-full-grid">Overview</h2>
      <div className="homepage-main-container-grid-first-half">
        <ListCard
          title="Total Launches"
          ListComponent={
            <ul>
              {top5urls.map((u) => (
                <UrlData url={u} data={urlSumarry[u]} totalTimeSpent={totalTimeSpent}></UrlData>
              ))}
            </ul>
          }
        />
      </div>
      <div className="homepage-main-container-grid-second-half">
        <ListCard
          title="Total Launches"
          ListComponent={
            <Example/>
          }
        />
      </div>
    </>
  );
};

export default Overview;

const UrlData = function ({ url, data, totalTimeSpent }: {totalTimeSpent:number, url: string; data: { launches: number; timeSpent: number } }) {
  return (
    <div className="Overview-Url-Data-container">
      <div className="Overview-Url-Data-text">
        <h3>{url}</h3>
        <h3>launches:{data.launches}</h3>
      </div>
      <progress value={data.timeSpent} max={totalTimeSpent}></progress>
    </div>
  );
};


