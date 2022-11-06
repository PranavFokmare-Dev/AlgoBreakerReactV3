import { IAnalyticsSummary } from "./models";

export async function getAnalytics():Promise<IAnalyticsSummary>{
  let analytics =  await getFromStorage("analytics") as IAnalyticsSummary ;
  return analytics === undefined || analytics == null?{}:analytics;
}

export function dateKey(jsDateNow:number):string{
  const d = new Date(jsDateNow);
  return `${d.getDate()}_${d.getMonth()}_${d.getFullYear()}`;
}

export function getFromStorage(key:string) {
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