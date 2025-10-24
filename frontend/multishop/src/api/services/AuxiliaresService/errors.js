import BaseError from '@shared/utils/baseError';

class AuxiliaresErrors extends BaseError {
      constructor(code, message, statusCode) {
            super('AUXILIARES_ERROR', code, message, statusCode);
      }
}

export default AuxiliaresErrors;