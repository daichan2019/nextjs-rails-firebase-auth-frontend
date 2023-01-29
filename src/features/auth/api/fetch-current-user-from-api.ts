import axios from 'axios';

import { API_BASE_URL } from '@/config/index';

export const fetchCurrentUserFromAPI = async (token: string, name = '') => {
  const res = await axios.post(`${API_BASE_URL}/auth/users`, {
    token,
    user: {
      name,
    },
  });

  return res.data;
};
