import apiClient from '../apiClient';

export interface SignInReq {
  email: string;
  password: string;
}

export interface SignUpReq {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export enum UserApi {
  SignIn = '/auth/signin',
  SignUp = '/auth/signup',
}

const signin = (data: SignInReq) => 
  apiClient.post<AuthResponse>({ url: UserApi.SignIn, data });

const signup = (data: SignUpReq) => 
  apiClient.post<AuthResponse>({ url: UserApi.SignUp, data });

export default {
  signin,
  signup,
};
