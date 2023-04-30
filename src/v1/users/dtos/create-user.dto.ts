import { IsInt, IsNotEmpty } from 'class-validator';
import { SignupDTO } from 'src/v1/auth/dtos';
import { Role } from 'src/v1/roles/roles.entity';

export class CreateUserDTO extends SignupDTO {
  @IsNotEmpty()
  @IsInt()
  role: Role | number;
}
