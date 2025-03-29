import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, saltOrRounds);
}

export const VerifyPassword = async (password: string, savedPs: string) => {
  return await bcrypt.compare(password, savedPs);
};
