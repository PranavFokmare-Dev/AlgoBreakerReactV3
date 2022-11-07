//GLOBAL DATA START
const analyticsEnum = {
  NoTabSet: -1,
  newTabUrl: "chrome://newtab/",
  emptyUrl: "EMPTY_URL",
  historyRemoverAlarmName: "historyWeeklyRemover",
};
const webPage = {
  homePage: "#primary > ytd-rich-grid-renderer",
  videoPlayerEndScreen:
    "#movie_player > div.html5-endscreen.ytp-player-content.videowall-endscreen.ytp-show-tiles",
  videoPlayerSideContent: "#items > ytd-item-section-renderer",
  search: "#page-manager > ytd-search",
  playlistSideContent: "#items > ytd-item-section-renderer",
  videoPlayerSideContent2: "#secondary",
};
const OPEN_CLOSE_DEBUG = true;
const EVENT_LOG_DEBUG = false;
let currentWindowId2:number = -1;
let window_tab_map:{[windowId:number]:number}= {};
let tempHistory:{[key:string]:string} = {}
let lastOpenEvent = "";
let lastClosedEvent = "";

let windowIdsOpened :{[widnowId:number]:"OPENED"}={}
const timeAnalysis:ITimeAnalysis = {};
//GLOBAL DATA END

//MODELS START
enum EventTypeEnum {
  CLOSED = "closed",
  OPENED = "opened"
}
interface IAnalyticsEvent{
  url:string,
  windowId:number,
  tabId:number,
  date:string,
  eventType:EventTypeEnum
  host:string,
  jsDateNow:number;
}
interface IAnalyticsSummary{
  [date:string]:IUrlData
}
interface IUrlData{
  [url:string]:{
    launches:number,
    timeSpent:number
  }
}
interface ITimeAnalysis{
  [url:string]:{
    startTime:number,
    endTime:number
  }
}
//MODELS END
chrome.runtime.onInstalled.addListener(async () => {
  chrome.storage.sync.set({ mode: "on" }, function () {});
  console.log("runtime on installed");
  await setInStorage({ mode: "on" });
  await saveAnalytics({});
  const weekDurationInMins = 7 * 24 * 60;
  chrome.alarms.create(analyticsEnum.historyRemoverAlarmName, {
    periodInMinutes: weekDurationInMins,
  });
});

//Button click -> on/off call
chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if(request.eventType==="BtnClick")
    AlgoBreakerMain(request.mode, request.tabId, request.tabUrl);
    console.log("SUMMARY START")
    console.log(await getAnalytics());
    console.log(timeAnalysis);
    console.log("SUMMARY END");
  });
function AlgoBreakerMain(mode:string, tabId:number, url:string) {
  if (mode === "on") AlgoBreakerOn(tabId);
  else AlgoBreakerOff(tabId);
}

function AlgoBreakerOn(tabId:number) {
  const hideCss = `${webPage.homePage}{visibility:hidden}
  ${webPage.videoPlayerEndScreen}{visibility:hidden}
  ${webPage.videoPlayerSideContent}{visibility:hidden}
  ${webPage.playlistSideContent}{visibility:hidden}
  ${webPage.videoPlayerSideContent2}{visibility:hidden}
  `;
  // adding if url starts with
  // adding show css if the url doesnt starts with
  chrome.scripting.insertCSS(
    {
      target: { tabId: tabId },
      css: hideCss,
    },
    () => {}
  );
}

function AlgoBreakerOff(tabId:number) {
  const showCss = `${webPage.homePage}{visibility:visible}
    ${webPage.videoPlayerEndScreen}{visibility:visible}
    ${webPage.videoPlayerSideContent}{visibility:visible}
    ${webPage.playlistSideContent}{visibility:visible}
    ${webPage.videoPlayerSideContent2}{visibility:visible}
    `;
  chrome.scripting.insertCSS(
    {
      target: { tabId: tabId },
      css: showCss,
    },
    () => {}
  );
}



  chrome.tabs.onUpdated.addListener(handleUrlLoaded)
  chrome.tabs.onActivated.addListener(handleTabSwitch)
  chrome.tabs.onRemoved.addListener(handleTabClosed)
  chrome.windows.onFocusChanged.addListener(handleWindowSwitch)

  async function handleUrlLoaded(tabId:number, changeInfo:chrome.tabs.TabChangeInfo, tab:chrome.tabs.Tab){
    EVENT_LOG_DEBUG && console.log("URL LOADED")
    if(changeInfo.status!==undefined && changeInfo.status== "complete"){
      await launchCloseIfLoadedinSameTab();
      
      if(tab.active)
        await launchOpenEvent(tabId, tab.windowId, tab.url??"NO_URL");
      tempHistory[createKey(tabId,tab.windowId)]=tab.url??"NO_URL";

    }


    async function launchCloseIfLoadedinSameTab() {
      if (currentWindowId2== tab.windowId 
        && tabId == window_tab_map[currentWindowId2] 
        && tab.url !== "chrome://newtab/"
        && tempHistory[createKey(tabId,tab.windowId)]!== undefined 
        && tempHistory[createKey(tabId,tab.windowId)]!== "chrome://newtab/") {
        await launchClosedEvent(tabId, tab.windowId);
      }
    }
  }

  async function handleTabSwitch({tabId, windowId}:chrome.tabs.TabActiveInfo){
    EVENT_LOG_DEBUG && console.log("TAB SWITCH")
    let oldTabId = window_tab_map[currentWindowId2]==undefined?-1:window_tab_map[currentWindowId2];
    if(oldTabId!=-1)
    {
      await launchClosedEvent(oldTabId, currentWindowId2);
    }
    if(tempHistory[createKey(tabId,windowId)]!== undefined) 
      await launchOpenEvent(tabId,windowId,tempHistory[createKey(tabId,windowId)]);
    currentWindowId2 = windowId;
    window_tab_map[windowId]=tabId;
    windowIdsOpened[windowId]="OPENED";
  }

  async function handleTabClosed(tabId:number, {windowId,isWindowClosing}:chrome.tabs.TabRemoveInfo){
    EVENT_LOG_DEBUG && console.log("TAB CLOSED");
    if(currentWindowId2 === windowId && window_tab_map[windowId]===tabId)
      await launchClosedEvent(tabId,windowId);
    delete tempHistory[createKey(tabId, windowId)];
    if(isWindowClosing)
      delete windowIdsOpened[windowId];
  }

  function handleWindowSwitch(windowId:number){
    EVENT_LOG_DEBUG && console.log("WINDOW SWITCH",currentWindowId2,windowId );
    if(windowIdsOpened[windowId]!== undefined)
    handleTabSwitch({windowId:windowId, tabId:window_tab_map[windowId]})
  }

 async function launchOpenEvent(tabId: number, windowId:number, url:string) {
    if(url == "chrome://newtab/")return;
    lastOpenEvent = createKey(tabId,windowId);
    OPEN_CLOSE_DEBUG && console.log(`OPEN url:${url} tabId:${tabId} windowId:${windowId}  ${new Date()}`)
    let openEvent:IAnalyticsEvent = {
      url:url,
      windowId:windowId,
      tabId:tabId,
      date:(new Date()).toDateString(),
      eventType:EventTypeEnum.OPENED,
      host:getHostName(url),
      jsDateNow:Date.now()
    }
    await handleOpenEvent(openEvent); 
  }
  
 async function launchClosedEvent(tabId: number, windowId: number) {
    if(tempHistory[createKey(tabId,windowId)]===undefined)return;
    lastClosedEvent = `${createKey(tabId,windowId)}_${tempHistory[createKey(tabId,windowId)]}`;
    
    OPEN_CLOSE_DEBUG && console.log(`CLOSED url:${tempHistory[createKey(tabId,windowId)]} tabId:${tabId} windowId:${windowId}  ${new Date()}`)
    let closedEvent:IAnalyticsEvent = {
      url:tempHistory[createKey(tabId,windowId)],
      windowId:windowId,
      tabId:tabId,
      date:(new Date()).toDateString(),
      eventType:EventTypeEnum.CLOSED,
      host:getHostName(tempHistory[createKey(tabId,windowId)]),
      jsDateNow:Date.now()
    }  
    await handleClosedEvent(closedEvent);
  }

async function handleOpenEvent(openEvent:IAnalyticsEvent){
  const summary:IAnalyticsSummary = await getAnalytics();
  initialize();
  summary[dateKey(openEvent.jsDateNow)][openEvent.host].launches++;
  
  await saveAnalytics(summary);
  //console.log("ANALYTICS START", summary);
  if(timeAnalysis[openEvent.url]===undefined){
    timeAnalysis[openEvent.url]= {startTime:openEvent.jsDateNow,endTime:openEvent.jsDateNow};
  }

  function initialize() {
    if (summary[dateKey(openEvent.jsDateNow)] == undefined) {
      summary[dateKey(openEvent.jsDateNow)] = { [openEvent.host]: { launches: 0, timeSpent: 0 } };
    }
    if(summary[dateKey(openEvent.jsDateNow)][openEvent.host]===undefined){
      summary[dateKey(openEvent.jsDateNow)][openEvent.host] = {launches:0, timeSpent:0};
    }

  }
}

async function handleClosedEvent(closedEvent:IAnalyticsEvent){
  const summary:IAnalyticsSummary = await getAnalytics();
  if(timeAnalysis[closedEvent.url]===undefined || closedEvent.url == undefined){
    console.log("ERROR NO TIME ANALYSIS");
    console.log(timeAnalysis);
    console.log(closedEvent.url);
    console.log("ERROR END");
    return;
  }
  timeAnalysis[closedEvent.url].endTime=closedEvent.jsDateNow;
  summary[dateKey(closedEvent.jsDateNow)][closedEvent.host].timeSpent+=getTimeSpent(timeAnalysis,closedEvent.url);
  console.log("TIME SPENT FOR ",closedEvent.host, summary[dateKey(closedEvent.jsDateNow)][closedEvent.host].timeSpent)
  await saveAnalytics(summary);
  //console.log("ANALYTICS CLOSE", summary);
  function getTimeSpent(timeAnalysis:ITimeAnalysis,url:string) {
    return timeAnalysis[url].endTime - timeAnalysis[url].startTime;
  }
}

//UTILITY METHODS START
async function getAnalytics():Promise<IAnalyticsSummary>{
  let analytics =  await getFromStorage("analytics") as IAnalyticsSummary ;
  return analytics === undefined || analytics == null?{}:analytics;
}
async function saveAnalytics(summary:IAnalyticsSummary){
  await setInStorage({ analytics: summary });
}
function dateKey(jsDateNow:number):string{
  const d = new Date(jsDateNow);
  return `${d.getDate()}_${d.getMonth()}_${d.getFullYear()}`;
}
function getFromStorage(key) {
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
function setInStorage(data) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set(data, function () {
      resolve(data);
    });
  });
}
function getHostName(url:string) {
  try{
    const details = new URL(url);
    return details.hostname;
  }
  catch{
    return "";
  }
}
function createKey(tabId:number, windowId:number):string{
  return `${tabId}_${windowId}`;
}
//UTILITY METHODS END

