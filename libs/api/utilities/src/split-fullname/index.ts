export const splitFullname = (payload: string) => {
  const splitName = payload.split(" ");
  const [lastName, ...firstName] = splitName.reverse();
  return { firstName: firstName.reverse().join(" "), lastName };
};
