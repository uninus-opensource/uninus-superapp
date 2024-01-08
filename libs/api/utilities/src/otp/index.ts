export const generateOtp = async () => {
  const currentDate = new Date();

  currentDate.setMinutes(currentDate.getMinutes() + 2);

  return {
    token: String(Math.floor(100000 + Math.random() * 900000)),
    expiredAt: new Date(currentDate.toISOString()),
  };
};
