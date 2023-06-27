export const MetaPrefix = (data: unknown) => {
  return {
    message: 'Welcome to auth-api!',
    data,
    meta: {
      page: 1,
      per_page: 1,
      total_page: 1,
    },
  };
};
