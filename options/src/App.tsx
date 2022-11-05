import React, { FC, useEffect, useState } from 'react';
import { getLaunchesHistory, getTimeSpentHistory } from './utils/chromeWrappers';
import { IAnalyticsHistory } from './utils/models';
const App: FC = () => {
  const [timeSpent, setTimeSpentHistory] = useState<IAnalyticsHistory>({});
  const [launches, setLaunchesHistory] = useState<IAnalyticsHistory>({});
  useEffect(() => {
    getLaunchesHistory().then((h) => {
      console.log(h);
      setLaunchesHistory(h);
    });
    getTimeSpentHistory().then((h) => {
      setTimeSpentHistory(h);
    });
  }, []);
  const display = JSON.stringify(timeSpent);
  const display2 = JSON.stringify(launches);
  return (
    <div>
      hello from React on Options page!
      <h1>TIME SPENT</h1>
      <p>{display}</p>
      <h1>Launches</h1>
      <p>{display2}</p>
    </div>
  );
};

export default App;
