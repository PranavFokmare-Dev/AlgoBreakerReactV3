import React, { FC, useEffect, useState } from 'react';
import { getAnalytics } from './utils/chromeWrappers';
import { IAnalyticsSummary } from './utils/models';

const App: FC = () => {
  const [timeSpent, setTimeSpentHistory] = useState<IAnalyticsSummary>({});
  useEffect(() => {
    getAnalytics().then((h) => {
      console.log(h);
      setTimeSpentHistory(h);
    });
  }, []);
  const display = JSON.stringify(timeSpent);
  
  return (
    <div>
      hello from React on Options page!
      <h1>TIME SPENT</h1>
      <p>{display}</p>
    </div>
  );
};

export default App;
