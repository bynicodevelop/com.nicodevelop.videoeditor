export interface IUid {
  uid: string;
}

export interface ICut {
  start: number;
  end: number;
}

export type CutEntity = IUid & ICut;
