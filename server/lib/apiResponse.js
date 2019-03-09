
module.exports.apiRes = {
  success: (data) => ({
    success: true,
    data,
  }),
  failed: (error) => ({
    success: false,
    message: error,
  }),
};
