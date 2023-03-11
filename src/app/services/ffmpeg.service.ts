import { Injectable } from '@angular/core';

import { defer, Observable } from 'rxjs';

import { createFFmpeg, fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';

import { getFileNameFromFile } from '../core/lib/string';
import { CutEntity } from '../models/cuts';
import { VideoEntity } from '../models/video';

@Injectable({
  providedIn: 'root',
})
export class FFmpegService {
  private ffmpeg: FFmpeg;

  private duration: number = 0;

  constructor() {
    this.ffmpeg = createFFmpeg({
      log: true,
      mainName: 'main',
      corePath: 'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js',
    });

    this.ffmpeg.setLogger(({ message }): void => {
      this._durationFileter(message);
    });
  }

  private async _loadFFmpeg(): Promise<void> {
    if (!this.ffmpeg.isLoaded()) {
      await this.ffmpeg.load();
    }
  }

  private async _clean(filenamelist: string[] = []): Promise<void> {
    for (const filename of filenamelist) {
      this.ffmpeg.FS('unlink', filename);
    }

    this.ffmpeg.exit();
  }

  private _durationFileter(message: string): void {
    const DURATION_REGEX = /Duration:\s+(\d+:\d+:\d+\.\d+)/g;

    const duration = DURATION_REGEX.exec(message);

    if (duration) {
      this.duration = parseFloat(
        duration[1]
          .split(':')
          .reduce((acc, time): number => {
            return 60 * acc + parseFloat(time);
          }, 0)
          .toFixed(4)
      );
    }
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

  private async _compressVideo(file: File, audio: Blob): Promise<Blob> {
    this.ffmpeg.FS('writeFile', file.name, await fetchFile(file));

    const audioFileName = `${getFileNameFromFile(file.name)}.mp3`;

    this.ffmpeg.FS('writeFile', audioFileName, await fetchFile(audio));

    await this.ffmpeg.run(
      '-i',
      `${file.name}`,
      '-i',
      audioFileName,
      '-c:v',
      'copy',
      '-c:a',
      'aac',
      '-map',
      '0:v:0',
      '-map',
      '1:a:0',
      'output.mp4'
    );

    const data = this.ffmpeg.FS('readFile', 'output.mp4');

    const video = new Blob([data.buffer], { type: 'video/mp4' });

    return video;
  }

  /**
   * Exporte une vidéo concaténée à partir d'un fichier de concaténation et d'un nom de fichier de sortie.
   * @param outpuFileName Le nom du fichier de sortie pour la vidéo concaténée.
   * @param concatFileName Le nom du fichier de concaténation contenant la liste des fichiers à concaténer.
   * @returns Une promesse résolue avec un objet Blob représentant la vidéo concaténée.
   */
  private async _exportVideo(
    outpuFileName: string,
    concatFileName: string
  ): Promise<Blob> {
    await this.ffmpeg.run(
      '-f',
      'concat',
      '-safe',
      '0',
      '-i',
      concatFileName,
      '-c',
      'copy',
      outpuFileName
    );

    const data = this.ffmpeg.FS('readFile', outpuFileName);

    return new Blob([data.buffer], { type: 'video/mp4' });
  }

  /**
   * Coupe une vidéo en fonction du temps de début et de fin spécifié.
   * @param start Le temps de début de la coupe, en secondes.
   * @param end Le temps de fin de la coupe, en secondes.
   * @param inputPath Le chemin d'accès de la vidéo d'entrée.
   * @param outputPath Le chemin d'accès de la vidéo de sortie.
   * @returns La vidéo coupée en tant que Uint8Array.
   */
  private async _cutVideo(
    start: number,
    end: number | null,
    inputPath: string,
    outputPath: string
  ): Promise<Uint8Array> {
    if (end) {
      await this.ffmpeg.run(
        '-i',
        inputPath,
        '-ss',
        start.toString(),
        '-to',
        end.toString(),
        outputPath
      );
    } else {
      await this.ffmpeg.run(
        '-i',
        inputPath,
        '-ss',
        start.toString(),
        outputPath
      );
    }

    return this.ffmpeg.FS(`readFile`, outputPath);
  }

  /**
   * Crée un fichier contenant une liste de fichiers vidéo exluant les silences.
   * @param listCut Liste des coupures vidéo silencieuses.
   * @param filename Nom du fichier à créer.
   * @returns Une promesse résolue une fois que le fichier a été créé.
   */
  private async _createFileSilence(
    listCut: Uint8Array[],
    filename: string
  ): Promise<void> {
    const blobList = listCut.map(
      (data): Blob => new Blob([data.buffer], { type: 'video/mp4' })
    );

    const videoFilenames = [];
    const fileString = [];

    for (let i = 0; i < blobList.length; i++) {
      const blob = blobList[i];
      const filename = `video${i}.mp4`;

      videoFilenames.push(filename);
      await this.ffmpeg.FS('writeFile', filename, await fetchFile(blob));

      fileString.push(`file '${filename}'`);
    }

    await this.ffmpeg.FS('writeFile', filename, fileString.join('\r'));
  }

  private async _compressVideoWithCuts(
    file: File,
    cuts: CutEntity[]
  ): Promise<Blob> {
    this.ffmpeg.FS('writeFile', file.name, await fetchFile(file));

    let i = 0;
    const listCut = [];

    for (const cut of cuts) {
      await this._loadFFmpeg();

      // if (regions[i + 1]) {
      listCut.push(
        await this._cutVideo(
          cut.start,
          cuts[i + 1]?.start || null,
          file.name,
          `output${i}.mp4`
        )
      );
      // }

      this.ffmpeg.exit();

      i++;
    }

    await this._loadFFmpeg();

    await this._createFileSilence(listCut, 'list.txt');

    console.log(this.ffmpeg.FS('readdir', '.'));

    const video = await this._exportVideo('output.mp4', 'list.txt');

    this.ffmpeg.exit();

    return video;
  }

  extractVideoData(file: File): Observable<{
    duration: number;
    audio: Blob;
  }> {
    return defer(
      async (): Promise<{
        duration: number;
        audio: Blob;
      }> => {
        await this._loadFFmpeg();

        const outputFileName = `${getFileNameFromFile(file.name)}.mp3`;

        const audio = await this._extractAudio(file, outputFileName);

        await this._clean([outputFileName]);

        return {
          duration: this.duration,
          audio,
        };
      }
    );
  }

  exportVideo(
    videoEntity: VideoEntity,
    cuts: CutEntity[] = []
  ): Observable<Blob> {
    console.log('videoEntity', videoEntity);
    console.log('cuts', cuts);

    return defer(async (): Promise<Blob> => {
      await this._loadFFmpeg();

      if (cuts.length === 0) {
        const video = await this._compressVideo(
          videoEntity.file,
          videoEntity.audio!
        );

        await this._clean([
          videoEntity.file.name,
          `${videoEntity.file.name}.mp3`,
          'output.mp4',
        ]);

        return video;
      }

      const video = await this._compressVideoWithCuts(videoEntity.file, cuts);

      return video;
    });
  }
}
