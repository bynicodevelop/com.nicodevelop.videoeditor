import { uidFromFile } from '../core/lib/uid';

export interface IUid {
  uid: string;
}

export interface IAudios {
  audio: Blob;
}

export interface IVideo {
  file: File;
}

export type VideoEntity = IVideo & IUid & Partial<IAudios>;

export function videoEntityFactory(video: IVideo, audio?: Blob): VideoEntity {
  return {
    ...video,
    uid: uidFromFile(video.file),
    audio,
  };
}
