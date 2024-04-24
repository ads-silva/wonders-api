import jsonwebtoken from 'jsonwebtoken';
import { hashPassword } from '../helpers/encriptHelper.mjs';
import findUser from '../services/userService.mjs';
import envConfig from '../config/envConfig.mjs';

const auth = async (req, res) => {
  const { email, password } = req.body;
  const { JWT_SECRET_KEY, JWT_EXPIRES_IN } = envConfig();

  // Hash current password to compare from db
  const passwordHhash = await hashPassword(password, JWT_SECRET_KEY);
  const existentUser = await findUser(email);

  if (!existentUser || passwordHhash !== existentUser.password) {
    res.status(401);
    res.send({ error: 'Invalid credentials' });
    return;
  }

  const { password: _p, ...user } = existentUser;

  const authToken = jsonwebtoken.sign({ email, user }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });

  res.status(201).send({ authToken, user: user.dataValues });
};

export default auth;
