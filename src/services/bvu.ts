import axios from 'axios';

export class BVUSearcher {
  static getDiploma(form: any) {
    return axios({
      method: 'POST',
      url: process.env.VUE_APP_HOST,
      data: form,
    });
  }

  static getDiplomaDetails(key: string) {
    return axios({
      method: 'POST',
      url: `${process.env.VUE_APP_HOST}/details/${key}`,
      data: {
        key,
      },
    });
  }
}
