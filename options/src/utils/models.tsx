export interface IWindowSesion {
    [windowId: number]: ITabInfo;
  }
  export interface ITabInfo {
    currentTabId: number;
    tabSessions: ITabSession;
  }
  export interface ITabSession {
    [tabId: number]: ITabSessionDetails
  }
  export interface ITabSessionDetails{
    url: string;
    startTime: number;
    endTime: number;
  }
  export interface IHistory {
    [url: string]: number;
  }