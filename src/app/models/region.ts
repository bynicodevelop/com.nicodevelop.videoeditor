export interface IUid {
  uid: string;
}

export interface IRegion {
  start: number;
  end: number;
  duration: number;
}

export type RegionEntity = IRegion & IUid;
