class OperationResult {
  static success(data = {}) {
    return {
      success: true,
      data: data,
    };
  }

  static error(errorMessage = "Default error message", data = {}) {
    return {
      success: false,
      errorMessage,
      data: data,
    };
  }
}

module.exports = {
  OperationResult
}
