export const paginate = (query: Object, page: number, pageSize: number) => {
  const offset = page - 1 * pageSize;
  const limit = pageSize;

  return {
    ...query,
    offset,
    limit
  };
};
