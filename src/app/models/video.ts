import { uidFromFile } from '../core/lib/uid';

export interface uid {
  uid: string;
}

export interface IAudios {
  audio: Blob;
}

export interface IVideo {
  file: File;
}

export type VideoEntity = IVideo & uid & Partial<IAudios>;

export function videoEntityFactory(video: IVideo, audio?: Blob): VideoEntity {
  return {
    ...video,
    uid: uidFromFile(video.file),
    audio,
  };
}
