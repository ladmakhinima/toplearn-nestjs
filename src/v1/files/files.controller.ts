import { JwtAuthGuard } from './../../common/modules/jwt-auth/guards/jwt-auth.guard';
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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFileDTO } from './dtos';
import { FilesService } from './files.service';

// @UseGuards(JwtAuthGuard)
@Controller({ path: 'files', version: '1' })
export class FilesController {
  @Inject(FilesService)
  private readonly fileService: FilesService;

  @Get()
  getAllFiles() {
    return this.fileService.selectAll();
  }

  @Delete(':id')
  deleteFileById(@Param('id', ParseIntPipe) id: number) {
    return this.fileService.delete(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  createFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateFileDTO,
  ) {
    return this.fileService.create(file, body.type);
  }
}
