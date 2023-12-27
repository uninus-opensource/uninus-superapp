export const generateOtp = async () => {
  return {
    token: String(Math.floor(100000 + Math.random() * 900000)),
    expiredAt: new Date(new Date().valueOf() + 1000 * 60 * 2),
  };
};
