import axios from '../axios/index';

const getListCategory = ({page, limit}) => {

  let query = `/unauthorized-api/categories/list?page=${page}&limit=${limit}`;
  return axios.get(query);
};
const categoryApi = {
  getListCategory
};

export default categoryApi;