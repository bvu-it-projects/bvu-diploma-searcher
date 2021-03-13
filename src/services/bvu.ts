import axios from 'axios';

export class BVUSearcher {
  static getDiploma(form: any) {
    return axios({
      method: 'POST',
      url: 'https://diploma.icestorm.dev/',
      data: form,
    });
  }
}
