import { CoreEntity } from 'src/common/core/core.entity';
import { Column, Entity } from 'typeorm';

export enum FileType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
}

@Entity({ name: '_files' })
export class File extends CoreEntity {
  @Column('varchar', { nullable: false, unique: true, name: 'name' })
  name: string;

  @Column('varchar', { nullable: false, name: 'mimetype' })
  mimetype: string;

  @Column('decimal', { nullable: false, name: 'size' })
  size: number;

  @Column('varchar', { nullable: false, name: 'type' })
  type: FileType;
}
