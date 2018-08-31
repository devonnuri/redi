import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export const hash = (plain: string): Promise<string> => {
  return bcrypt.genSalt(saltRounds).then(salt => {
    return bcrypt.hash(plain, salt);
  });
};

export const check = (plain: string, hashed: string): Promise<boolean> => {
  return bcrypt.compare(plain, hashed);
};
