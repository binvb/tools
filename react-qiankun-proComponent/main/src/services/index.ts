import request from './axios'
export interface LoginParamsType {
  nickname: string;
  password: string;
  mobile?: string;
  captcha?: string;
  type?: string;
}

export async function accountLogin(params: LoginParamsType) {
  return request('/api/perm/login', {
    method: 'POST',
    data: params,
  });
}


export async function outLogin() {
  return request('/api/login/outLogin');
}
