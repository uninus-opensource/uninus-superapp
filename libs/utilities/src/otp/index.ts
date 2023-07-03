const otpMap = new Map();

export const generateOtp = async (email: string) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpMap.set(email, otp);
  return otp;
};

export const compareOtp = async (email: string, otp: string) => {
  const storedOtp = await otpMap.get(email);
  const isVerified = otp === storedOtp && otpMap.delete(email);
  return isVerified;
};
