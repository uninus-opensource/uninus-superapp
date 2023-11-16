export const splitFullname = (payload: string) => {
  const splitName = payload.split(" ");
  if (splitName.length < 2) {
    return { firstName: splitName[0], lastName: "" };
  }
  const [lastName, ...firstName] = splitName.reverse();
  return { firstName: firstName.reverse().join(" "), lastName };
};
