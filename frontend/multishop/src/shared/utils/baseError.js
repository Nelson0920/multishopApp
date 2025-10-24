class BaseError extends Error {
      constructor(name, code, message, statusCode) {
            super(message);
            this.statusCode = statusCode;
            this.name = name;
            this.code = code;
      }

      toJSON() {
            return {
                  name: this.name,
                  code: this.code,
                  message: this.message,
                  statusCode: this.statusCode
            };
      }
}

export default BaseError;