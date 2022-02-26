import axios from '../../axios/index';

const getListThreadByCategory = ({category, page, limit}) => {
 ///IMPORTANT NOTE : parameter in reducer and parameter in handler, API need to have the same name
  //alert('category ' + category + ' limit ' + limit + ' page ' + page);
  const listReturn =  axios.post('/api/thread/get-thread-by-cat', {category, page,limit});
  return listReturn;
};

const getListPostByThread =  ({postThreadId, page, limit}) => {
  
  const listReturn =  axios.post('/api/post/get-post-by-thread', {postThreadId, page,limit});
  return listReturn;
};

const deleteAuctionProduct = (data) => {
  return axios.post('/api/admin/product/deleteAuctionProductList', data);
};

const adminProductApi = {
  getListThreadByCategory,
  deleteAuctionProduct,
  getListPostByThread
};

export default adminProductApi;