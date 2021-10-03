import http from 'src/http-common';

class GMCService {
  constructor() {
    this.http = http;
  }

  getDataByUrl(url, ops = {}) {
    return this.http.get(url, ops);
  }

  putDataByUrl(url, requestData) {
    return this.http.put(url, requestData);
  }

  patchDataByUrl(url, requestData) {
    return this.http.patch(url, requestData);
  }

  postDataByUrl(url, requestData) {
    return this.http.post(url, requestData);
  }

  deleteDataByUrl(url) {
    return this.http.delete(url);
  }

  async getDataByUrlCb(url, ops, callback) {
    try {
      const res = await this.getDataByUrl(url, ops);
      const { status, data } = res;
      if (status === 200 || status === 201) {
        callback(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getMailDetail(url, ops, callback) {
    try {
      const res = await this.getDataByUrl(url, ops);
      const { status, data } = res;
      if (status === 200 || status === 201) {
        callback(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new GMCService();
