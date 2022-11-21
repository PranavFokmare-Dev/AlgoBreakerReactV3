import { IAnalyticsSummary } from '../utils/models';

export function getAnalytics(): Promise<IAnalyticsSummary> {
  const data: IAnalyticsSummary = {
    [dateKey(Date.now())]: {
      'ab1c': { launches: randomNum(), timeSpent: randomNum() },
      'bgd2': { launches: randomNum(), timeSpent: randomNum() },
      'ged43': { launches: randomNum(), timeSpent: randomNum() },
      'ds5a': { launches: randomNum(), timeSpent: randomNum() },
      'ds4a': { launches: randomNum(), timeSpent: randomNum() },
      'xy4z': { launches: randomNum(), timeSpent: randomNum() },
      '123ab1c': { launches: randomNum(), timeSpent: randomNum() },
      '1bgd2': { launches: randomNum(), timeSpent: randomNum() },
      '1ged43': { launches: randomNum(), timeSpent: randomNum() },
      '1ds5a': { launches: randomNum(), timeSpent: randomNum() },
      'd1s4a': { launches: randomNum(), timeSpent: randomNum() },
      '1xy4z': { launches: randomNum(), timeSpent: randomNum() },
    },
    '5_01_2022': {
      'abc1': { launches: 100, timeSpent: 1000 },
      'bgd2': { launches: 100, timeSpent: 1000 },
      'ged3': { launches: 100, timeSpent: 1000 },
      'dsa4': { launches: 100, timeSpent: 1000 },
      'dsa2': { launches: 100, timeSpent: 1000 },
      'xyz5': { launches: 100, timeSpent: 1000 },
    },
  };
  return new Promise((resolve,reject)=>{
    return resolve(data);
  });

}

export function dateKey(jsDateNow:number):string{
    const d = new Date(jsDateNow);
    return `${d.getDate()}_${d.getMonth()}_${d.getFullYear()}`;
  }

  function randomNum(){
   return  Math.floor(Math.random() * 1000);
  }

// export async function getAnalytics():Promise<IAnalyticsSummary>{
//   let analytics =  await getFromStorage("analytics") as IAnalyticsSummary ;
//   return analytics === undefined || analytics == null?{}:analytics;
// }



// export function getFromStorage(key:string) {
//   return new Promise((resolve, reject) => {
//     chrome.storage.sync.get([key], function (result) {
//       const value = result[key];
//       if (chrome.runtime.lastError) {
//         console.log("error occured");
//       } else {
//         resolve(value);
//       }
//     });
//   });
// }
