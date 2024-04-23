const findUser = (email) => {
  const requesterUserData = {
    email: 'requester@mail.com',
    password: 'fed42fb0fabde4000af60bf1f63037905176d6db1df5c2ee6214ee83565de36b',
    role: 'requester',
  };

  const managerUserData = {
    email: 'manager@mail.com',
    password: 'fed42fb0fabde4000af60bf1f63037905176d6db1df5c2ee6214ee83565de36b',
    role: 'manager',
  };
  if (email === requesterUserData.email) {
    return requesterUserData;
  }
  if (email === managerUserData.email) {
    return managerUserData;
  }
  return null;
};
export default findUser;
