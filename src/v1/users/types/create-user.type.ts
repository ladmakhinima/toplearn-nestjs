import { File } from 'src/v1/files/files.entity';
import { Role } from 'src/v1/roles/roles.entity';

export interface ICreateUser {
  username: string;
  email: string;
  password: string;
  image?: number | File;
  bio?: string;
  phone?: string;
  role?: number | Role;
}
