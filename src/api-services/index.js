import env from '../app/env';
import AuthorizedInstance from './authorized';

export const ApiService = AuthorizedInstance(env.api.baseUrl.service);
export const ApiSubService = AuthorizedInstance(env.api.baseUrl.subservice);
