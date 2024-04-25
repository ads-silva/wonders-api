import jwt from 'jsonwebtoken';

export const getMinimalUserInformation = (fullUser) => {
  // eslint-disable-next-line no-unused-vars
  const { createdAt, updatedAt, password, ...mininalUser } = fullUser;
  return mininalUser;
};

export const hasUserAccessByRole = (token, roles) => {
  const { user } = jwt.decode(token);
  return roles.some((role) => role === user.role);
};
