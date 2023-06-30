export const parseRequest = (
  schemaProperties: string[],
  requestBody: object
): any => {
  const parsedData = Object.entries(requestBody)
    .filter(([key]) => schemaProperties.includes(key))
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

  return parsedData;
};
