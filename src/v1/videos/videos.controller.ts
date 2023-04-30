import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateVideoDTO } from './dtos';
import { VideosService } from './videos.service';

@Controller({ path: 'videos', version: '1' })
export class VideosController {
  @Inject(VideosService)
  private readonly videosService: VideosService;

  @Post()
  @UseInterceptors(FileInterceptor('video'))
  uploadVideos(
    @UploadedFile() uploadedFile: Express.Multer.File,
    @Body() body: CreateVideoDTO,
  ) {
    return this.videosService.create(uploadedFile, body);
  }

  @Get()
  getAllVideos() {
    return this.videosService.getAll();
  }

  @Delete(':id')
  deleteVideo(@Param('id', ParseIntPipe) id: number) {
    return this.videosService.deleteById(id);
  }
}
