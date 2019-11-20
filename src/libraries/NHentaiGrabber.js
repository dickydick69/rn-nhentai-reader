import axios from 'axios';
import Book from '../models/Book';

export default class NHentaiGrabber {
  constructor() {
    this.baseURL = 'https://nhtai-api.glitch.me/api/';
  }
  async g(id) {
    try {
      const {data} = await axios.get(`${this.baseURL}/id?id=${id}`);
      if (data.error) {
        throw {
          error: true,
          message: 'Not Found',
        };
      }
      return new Book(data);
    } catch (e) {
      if (e.error) {
        throw e;
      }
    }
  }

  async search(query, page = 1) {
    try {
      const {data} = await axios.get(`${this.baseURL}/search`, {
        params: {
          query,
          page,
        },
      });
      return {
        ...data,
        result: data.result.map(res => new Book(res)),
      };
    } catch (e) {
      throw e;
    }
  }
}
