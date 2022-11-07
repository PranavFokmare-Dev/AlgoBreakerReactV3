import { IAnalyticsSummary } from '../utils/models';

// export function getAnalytics(): Promise<IAnalyticsSummary> {
//   const data: IAnalyticsSummary = {
//     '6_01_2022': {
//       'ab1c': { launches: 100, timeSpent: 1000 },
//       'bgd2': { launches: 100, timeSpent: 1000 },
//       'ged43': { launches: 100, timeSpent: 1000 },
//       'ds5a': { launches: 100, timeSpent: 1000 },
//       'ds4a': { launches: 100, timeSpent: 1000 },
//       'xy4z': { launches: 100, timeSpent: 1000 },
//     },
//     '5_01_2022': {
//       'abc1': { launches: 100, timeSpent: 1000 },
//       'bgd2': { launches: 100, timeSpent: 1000 },
//       'ged3': { launches: 100, timeSpent: 1000 },
//       'dsa4': { launches: 100, timeSpent: 1000 },
//       'dsa2': { launches: 100, timeSpent: 1000 },
//       'xyz5': { launches: 100, timeSpent: 1000 },
//     },
//   };
//   return new Promise((resolve,reject)=>{
//     return resolve(data);
//   });

// }

export function dateKey(jsDateNow:number):string{
    const d = new Date(jsDateNow);
    return `${d.getDate()}_${d.getMonth()}_${d.getFullYear()}`;
  }

export async function getAnalytics():Promise<IAnalyticsSummary>{
  let analytics =  await getFromStorage("analytics") as IAnalyticsSummary ;
  return analytics === undefined || analytics == null?{}:analytics;
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
