import { getModels } from '../sequelize/index.mjs';

export const findUser = async (email) => {
  const user = await getModels().user.findOne({ where: { email } });
  return user;
};

export const findUserByPk = async (id) => {
  const user = await getModels().user.findByPk(id);
  return user.dataValues;
};
