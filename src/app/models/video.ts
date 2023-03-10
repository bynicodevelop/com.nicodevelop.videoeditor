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

export interface IExport {
  output: Blob;
}

export type VideoEntity = IVideo & IUid & Partial<IAudios> & Partial<IExport>;

export function videoEntityFactory(
  video: IVideo,
  audio?: Blob,
  exportVideo?: IExport
): VideoEntity {
  return {
    ...video,
    uid: uidFromFile(video.file),
    audio,
    ...exportVideo,
  };
}

export function videoEntityFactoryForExport(
  video: VideoEntity,
  exportVideo?: IExport
): VideoEntity {
  return {
    ...video,
    ...exportVideo,
  };
}
