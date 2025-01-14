export interface ProjectNodeTree {
    key: string;
    code: string;
    name?: string;
    type?: string;
    expand?: boolean;
    children?: ProjectNodeTree[];
    parent?: ProjectNodeTree;
    level?: number;
    muilesId?:string;
    muilesName?:string;
    startDate?:string;
    endDate?:string;
    planTime?:number;
    executors?:[];
    realTime?:number;
    parentId?:string;
    executor?:string;
    executorId?:string;
    keyId?:string;
    muilesCode?:string;
  }