import React, { FC, useState } from 'react';

enum ModeEnum{
  On="on",
  Off ="off"
}
const App: FC = () => {
  const [mode, setMode] = useState<ModeEnum>(ModeEnum.On);
  async function clickHandler(){
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.storage.sync.get(["mode"], function (result) {
      const mode = result.mode;
      const toggledMode = mode === "on" ? ModeEnum.Off : ModeEnum.On;
      setMode(toggledMode);
      chrome.storage.sync.set({ mode: toggledMode }, function () {
        chrome.runtime.sendMessage(
          { tabId: tab.id, tabUrl: tab.url, mode: toggledMode },
          function (response) {}
        );
      });
    });
  }
  return (<div>
    <h1>AlgoBreaker</h1>
    <button onClick = {clickHandler}>click to turn {(mode === ModeEnum.On)?"Off":"On"}</button>
  </div>);
};

export default App;
