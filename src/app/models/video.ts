export interface IAudios {
  audio: Blob;
}

export interface IVideo {
  name: string;
  file: File;
}

export type VideoEntity = IVideo & Partial<IAudios>;

export function videoEntityFactory(video: IVideo, audio?: Blob): VideoEntity {
  return {
    ...video,
    audio,
  };
}
