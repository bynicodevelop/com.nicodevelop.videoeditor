export type IdRegion = number;

export interface IRegion {
  id: IdRegion;
  start: number;
  end: number;
  duration: number;
}

export type RegionEntity = IRegion;
