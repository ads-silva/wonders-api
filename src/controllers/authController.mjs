import jsonwebtoken from 'jsonwebtoken';
import { hashPassword } from '../helpers/encriptHelper.mjs';
import { getMinimalUserInformation } from '../helpers/authHelper.mjs';
import { findUser, findUserByPk } from '../services/userService.mjs';
import envConfig from '../config/envConfig.mjs';

export const auth = async (req, res) => {
  const { email, password } = req.body;
  const { JWT_SECRET_KEY, JWT_EXPIRES_IN } = envConfig();

  // Hash current password to compare from db
  const passwordHhash = await hashPassword(password, JWT_SECRET_KEY);
  const existentUser = await findUser(email);

  if (!existentUser || passwordHhash !== existentUser.password) {
    res.status(401).send({ error: 'Invalid credentials' });
    return;
  }

  // Prevent expose sensitive information
  const user = getMinimalUserInformation(existentUser.dataValues);

  const authToken = jsonwebtoken.sign({ email, user }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });

  res.status(201).send({ authToken, user });
};

export const loadMe = async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  const existentUser = await findUserByPk(user.id);
  // Prevent expose sensitive information

  const refresehdUser = getMinimalUserInformation(existentUser);
  res.status(200).send(refresehdUser);
};
