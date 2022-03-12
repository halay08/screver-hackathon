const ResponseUtil = {
  result(params) {
    let options = {
      success: true,
      message: null,
      data: null,
    };
    options = Object.assign(options, params);

    return options;
  },
  success(params) {
    params = Object.assign(params, { success: true });
    return this.result(params);
  },
  error(error) {
    let message = null;
    switch (typeof error) {
      case "string":
        message = error;
        break;
      case "object":
        message = error.message || error.toString();
        break;
      default:
        message = error.toString();
    }

    const data = { error: message };
    if (error && error.stack) {
      data.stack = error.stack.split("\n").map((p) => p.trim());
    }

    return this.result({ success: false, message, data });
  },
};

module.exports = ResponseUtil;
