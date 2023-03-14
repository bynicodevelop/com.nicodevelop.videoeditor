export interface IUid {
  uid: string;
}

export interface IRegionSelected {
  selected: boolean;
}

export interface IRegion {
  start: number;
  end: number;
  duration: number;
}

export type RegionEntity = IRegion & IUid & Partial<IRegionSelected>;
