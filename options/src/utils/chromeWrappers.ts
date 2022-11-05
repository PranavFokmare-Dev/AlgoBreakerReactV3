import { IAnalyticsHistory } from "./models";

export async function getTimeSpentHistory(): Promise<IAnalyticsHistory> {
  let history = (await getFromStorage("timeSpentHistory")) as IAnalyticsHistory;
  return history === undefined || history == null ? {} : history;
}
export async function getLaunchesHistory(): Promise<IAnalyticsHistory> {
  let history = (await getFromStorage("launchesHistory")) as IAnalyticsHistory;
  return history === undefined || history == null ? {} : history;
}

  export function getFromStorage(key: string) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get([key], function (result) {
        const value = result[key];
        if (chrome.runtime.lastError) {
          console.log("error occured");
        } else {
          resolve(value);
        }
      });
    });
  }
  

  
  export function getTabInfo(tabId:number) {
    return new Promise((resolve, reject) => {
      chrome.tabs.get(tabId, function (tab) {
        resolve(tab);
      });
    });
  }
  
  export function getHostName(url:string) {
    const details = new URL(url);
    return details.hostname;
  }
  