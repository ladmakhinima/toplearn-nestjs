import * as bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(8);
  const passwordHashing = await bcrypt.hash(password, +salt);
  return passwordHashing;
};
