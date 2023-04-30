import { join } from 'path';

export const envPathHelper = () => {
  return join(__dirname, '..', 'envs', '.env');
};
