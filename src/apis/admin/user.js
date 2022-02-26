import axios from '../../axios/index';

const getUserList = ({page, limit, role}) => {
  return axios.post('/api/admin/user/list-by-role', {page,limit, role});
};

// const postAuctionProduct = (data) => {
//   return axios.post('/api/seller/postAuctionProduct', data);
// };

// const updateAuctionProduct = (data) => {
//   return axios.post('/api/seller/updateAuctionProduct', data);
// };

const deleteUser = (data) => {
  return axios.post('/api/admin/user/deleteUser', data);
};

const upgradeMod = (data) => {
  return axios.post('/api/admin/user/upgradeMod', data);
};

const downgradeUser = (data) => {
  return axios.post('/api/admin/user/downgradeUser', data);
};

const adminUserApi = {
  getUserList,
  // postAuctionProduct,
  // updateAuctionProduct,
  upgradeMod,
  downgradeUser,
  deleteUser,
};

export default adminUserApi;