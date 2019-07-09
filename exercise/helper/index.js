exports.responseError =  (res, errorcode, message) => {
  res.status(400).json({
    "errors": {
      "code": errorcode,
      "message": message
    }
  });
};
