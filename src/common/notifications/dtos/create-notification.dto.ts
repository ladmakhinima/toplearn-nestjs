import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationDTO {
  @IsNotEmpty()
  @IsString()
  action: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  parameters: string;
}
