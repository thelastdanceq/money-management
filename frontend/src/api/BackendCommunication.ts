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
    return this.axiosInstance.get('/auth/google');
  }
}

export const BackendCommunication = new BackendCommunicationSingleton(
  apiInstance,
);
