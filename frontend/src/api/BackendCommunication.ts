import { Axios } from 'axios';
import { apiInstance } from './initAxios.ts';

class BackendCommunicationSingleton {
  constructor(private axiosInstance: Axios) {}

  public async getVersion() {
    return this.axiosInstance.get('/version');
  }
}

export const BackendCommunication = new BackendCommunicationSingleton(
  apiInstance,
);
