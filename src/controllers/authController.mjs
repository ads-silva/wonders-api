import jsonwebtoken from 'jsonwebtoken';
import { hashPassword } from '../helpers/encriptHelper.mjs';
import { getMinimalUserInformation } from '../helpers/authHelper.mjs';
import findUser from '../services/userService.mjs';
import envConfig from '../config/envConfig.mjs';

const auth = async (req, res) => {
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

export default auth;
