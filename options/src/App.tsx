import React, { FC, useEffect , useState} from 'react';
import { getHistory } from './utils/chromeWrappers';
import { IHistory } from './utils/models';
const App: FC = () => {
  const [history,setHistory] = useState<IHistory>({});
  useEffect(()=>{
    getHistory().then(h =>{ 
      console.log(h);
      setHistory(h)});
  },[]);
  const display = JSON.stringify(history);
  return (<div>hello from React on Options page!
    <p>
      {display}
    </p>
  </div>);
};

export default App;
