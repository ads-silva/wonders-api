import { getModels } from '../sequelize/index.mjs';

const findUser = async (email) => {
  const user = await getModels().user.findOne({ where: { email } });
  return user;
};

export default findUser;
