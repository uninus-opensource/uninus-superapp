export const generateOtp = async () => {
  const expired = new Date();
  expired.setMinutes(expired.getMinutes() + 2);
  const expiredIso = expired.toISOString();
  return {
    token: String(Math.floor(100000 + Math.random() * 900000)),
    expiredAt: new Date(expiredIso),
  };
};
