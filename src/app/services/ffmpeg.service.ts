import { Injectable } from '@angular/core';

import { defer, Observable } from 'rxjs';

import { createFFmpeg, fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';

import { VideoEntity } from '../models/video';

@Injectable({
  providedIn: 'root',
})
export class FFmpegService {
  private ffmpeg: FFmpeg;

  constructor() {
    this.ffmpeg = createFFmpeg({
      log: true,
      mainName: 'main',
      corePath: 'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js',
    });
  }

  private async _loadFFmpeg(): Promise<void> {
    if (!this.ffmpeg.isLoaded()) {
      await this.ffmpeg.load();
    }
  }

  private async clean(filenamelist: string[] = []): Promise<void> {
    for (const filename of filenamelist) {
      this.ffmpeg.FS('unlink', filename);
    }

    this.ffmpeg.exit();
  }

  private async _extractAudio(
    file: File,
    outputFileName: string
  ): Promise<Blob> {
    this.ffmpeg.FS('writeFile', file.name, await fetchFile(file));

    await this.ffmpeg.run('-i', file.name, outputFileName);

    const data = this.ffmpeg.FS('readFile', outputFileName);

    const audio = new Blob([data.buffer], { type: 'audio/mp3' });

    return audio;
  }

  extractAudio(file: File): Observable<Blob> {
    return defer(async (): Promise<Blob> => {
      await this._loadFFmpeg();

      const outputFileName = `${file.name.replace(/\.[^/.]+$/, '')}.mp3`;

      const audio = await this._extractAudio(file, outputFileName);

      await this.clean([outputFileName]);

      return audio;
    });
  }

  exportVideo(videoEntity: VideoEntity): Observable<Blob> {
    console.log('videoEntity', videoEntity);

    return defer(async (): Promise<Blob> => {
      await this._loadFFmpeg();

      this.ffmpeg.FS(
        'writeFile',
        videoEntity.file.name,
        await fetchFile(videoEntity.file)
      );

      this.ffmpeg.FS(
        'writeFile',
        `${videoEntity.file.name}.mp3`,
        await fetchFile(videoEntity.audio!)
      );

      await this.ffmpeg.run(
        '-i',
        `${videoEntity.file.name}`,
        '-i',
        `${videoEntity.file.name}.mp3`,
        '-c:v',
        'copy',
        '-c:a',
        'aac',
        // '-strict',
        // 'experimental',
        '-map',
        '0:v:0',
        '-map',
        '1:a:0',
        'output.mp4'
      );

      const data = this.ffmpeg.FS('readFile', 'output.mp4');

      const video = new Blob([data.buffer], { type: 'video/mp4' });

      await this.clean([
        videoEntity.file.name,
        `${videoEntity.file.name}.mp3`,
        'output.mp4',
      ]);

      return video;
    });
  }
}
