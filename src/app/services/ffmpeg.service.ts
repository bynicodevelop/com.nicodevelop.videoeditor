import { Injectable } from '@angular/core';

import { defer, Observable } from 'rxjs';

import { createFFmpeg, fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';

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
      await this.ffmpeg.FS('unlink', filename);
    }

    await this.ffmpeg.exit();
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
    console.log('extractAudio', file);

    return defer(async (): Promise<Blob> => {
      await this._loadFFmpeg();

      const outputFileName = `${file.name.replace(/\.[^/.]+$/, '')}.mp3`;

      const audio = await this._extractAudio(file, outputFileName);

      await this.clean([outputFileName]);

      return audio;
    });
  }
}
