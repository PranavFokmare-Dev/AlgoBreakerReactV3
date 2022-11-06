export enum EventTypeEnum {
  CLOSED = "closed",
  OPENED = "opened"
}
export interface IAnalyticsEvent{
  url:string,
  windowId:number,
  tabId:number,
  date:string,
  eventType:EventTypeEnum
  host:string,
  jsDateNow:number;
}
export interface IAnalyticsSummary{
  [date:string]:IUrlData
}
export interface IUrlData{
  [url:string]:{
    launches:number,
    timeSpent:number
  }
}
export interface ITimeAnalysis{
  [url:string]:{
    startTime:number,
    endTime:number
  }
}