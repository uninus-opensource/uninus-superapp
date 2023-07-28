export const excludeSchema = (data: any, keys: String[]) => {
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => !keys.includes(key))
  );
};
