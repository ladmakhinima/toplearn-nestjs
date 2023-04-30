import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { createWriteStream, existsSync, mkdirSync, unlinkSync } from 'fs';
import * as ffpmeg from 'fluent-ffmpeg';
import * as ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import { extname } from 'path';
import { Readable } from 'stream';
ffpmeg.setFfmpegPath(ffmpegInstaller.path);

@Processor('video')
export class VideoProcessor {
  @Process({ name: 'create' })
  async createVideo(
    process: Job<{
      dirname: string;
      file: Express.Multer.File;
    }>,
  ) {
    console.log('ghio')
    const buffer = new Uint8Array((process.data.file.buffer as any).data);
    const readStream = new Readable();
    readStream.push(buffer);
    readStream.push(null);
    const videoDist = `./public/${process.data.dirname}`;
    const videoFile = `${videoDist}/video${extname(
      process.data.file.originalname,
    )}`;
    if (!existsSync(videoDist)) {
      mkdirSync(videoDist, { recursive: true });
    }
    const writeStream = createWriteStream(videoFile);
    readStream.pipe(writeStream).on('finish', () => {
      ffpmeg(videoFile).screenshot({
        count: 1,
        filename: `${videoDist}/screenshot.jpg`,
        timemarks: [0],
      });
    });
  }

  @Process({ name: 'delete' })
  async deleteVideo(process: Job<{ dest: string }>) {
    const videoAndImageDist = `./public/${process.data.dest}`;
    if (existsSync(videoAndImageDist)) {
      unlinkSync(videoAndImageDist);
    }
  }
}
