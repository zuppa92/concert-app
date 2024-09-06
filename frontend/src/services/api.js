import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

class ConcertApi {
  static token = localStorage.getItem('token');

  static async request(endpoint, params = {}, verb = 'get') {
    const headers = {};
    if (ConcertApi.token) {
      headers.Authorization = `Bearer ${ConcertApi.token}`;
    }

    let q;
    if (verb === 'get') {
      q = axios.get(`${BASE_URL}/${endpoint}`, { params, headers });
    } else if (verb === 'post') {
      q = axios.post(`${BASE_URL}/${endpoint}`, params, { headers });
    } else if (verb === 'patch') {
      q = axios.patch(`${BASE_URL}/${endpoint}`, params, { headers });
    } else if (verb === 'delete') {
      q = axios.delete(`${BASE_URL}/${endpoint}`, { headers, data: params });
    }

    try {
      const response = await q;
      return response.data;
    } catch (err) {
      console.error('API Error:', err.response || err.message);
      let message = err.response?.data?.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Updated method to fetch artist data, now includes Setlist.fm data
  static async getArtistData(artistName) {
    let res = await this.request('api/artists', { artistName });
    return res; // Return the combined response which includes Last.fm, Spotify, and Setlist.fm data
  }

  // Other methods remain unchanged
  static async register(data) {
    let res = await this.request('api/auth/register', data, 'post');
    if (res.token) {
      localStorage.setItem('token', res.token);
      ConcertApi.token = res.token;
    }
    return res;
  }

  static async login(data) {
    let res = await this.request('api/auth/login', data, 'post');
    if (res.token) {
      localStorage.setItem('token', res.token);
      ConcertApi.token = res.token;
    }
    return res;
  }

  static async getCurrentUser() {
    let res = await this.request('api/users/me');
    return res;
  }
}

export default ConcertApi;