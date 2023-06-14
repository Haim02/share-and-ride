const DEAFULT_PAGE_NUMBER = 1;
const DEAFULT_PAGE_LIMIT = 0;

const getPagination = (query) => {
  const page = Math.abs(query.page) || DEAFULT_PAGE_NUMBER;
  const limit = Math.abs(query.limit) || DEAFULT_PAGE_LIMIT;
  const skip = (page - 1) * limit;

  return {
    skip,
    limit,
  };
};

module.exports = {
  getPagination,
};
