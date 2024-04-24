import crypto from 'crypto';

export const hashPassword = async (password, salt) => {
  const hash = crypto.createHash('sha256');
  hash.update(password + salt);
  return hash.digest('hex');
};
