import React, { FC, useEffect, useState } from 'react';
import { getAnalytics } from '../../services/mockanalytics';
import { IAnalyticsSummary } from '../../utils/models';
import Card from '../cards/Card';

const TodaysStats = function ({ launches, timeSpent }: { launches: number; timeSpent: number }) {
  return (
    <>
      <h2 className="homepage-main-container-full-grid">Today's Stats</h2>
      <Card title="Total Launches" text={`${launches}.`} />
      <Card title="Total Time Spent" text={`${timeSpent}.`} />
      <div className="homepage-main-quote-card">
        <Card title="Today's Quote" text=" It Does Not Matter How Slowly You Go As Long As You Do Not Stop." />
      </div>
    </>
  );
};

export default TodaysStats;
