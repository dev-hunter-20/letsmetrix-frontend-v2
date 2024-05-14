import env from '../../../app/env';
import AuthorizedInstance from '../../authorized';

const AppService = AuthorizedInstance(env.api.baseUrl.app);

export default class AuthApiService {
  static async changePassword({ token, params, body }) {
    const response = await AppService.post(`/create_new_password`, body, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
  static async googleLogin({ params }) {
    const response = await AppService.get(`/google_login`, { params });
    return response.data;
  }
  static async loginApp({ params, body }) {
    const response = await AppService.post(`/login`, body, { params });
    return response.data;
  }
  static async registerApp({ params, body }) {
    const response = await AppService.post(`/register`, body, { params });
    return response.data;
  }
  static async resetPassword({ params, body }) {
    const response = await AppService.post(`/reset_password`, body, { params });
    return response.data;
  }
  static async login({ params, body }) {
    const response = await AppService.post(`/login`, body, { params });
    return response.data;
  }
}
