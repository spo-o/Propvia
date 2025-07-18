export const API_BASE_URL = 'http://localhost:5050/api/property'; //property

export const API_BASE_URL_USAGE = 'http://localhost:5050/api/usage';

export const API_REPORTS_URL = process.env.NODE_ENV === 'production'
  ? '/api'
  : 'http://localhost:5050/api';

