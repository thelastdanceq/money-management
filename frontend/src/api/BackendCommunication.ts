import { Axios } from 'axios';
import { apiInstance } from './initAxios.ts';

class BackendCommunicationSingleton {
  constructor(private axiosInstance: Axios) {}

  public async getVersion() {
    return this.axiosInstance.get('/version');
  }

  public async getUserData() {
    return this.axiosInstance.get('/get-user-data');
  }

  public async loginViaGoogle() {
    window.location.href = 'http://ec2-13-51-168-225.eu-north-1.compute.amazonaws.com:3000/auth/google';
  }
}

export const BackendCommunication = new BackendCommunicationSingleton(
  apiInstance,
);
