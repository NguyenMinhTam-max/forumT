import axios from '../axios/index';

const accessWeb = ({atkP,accidP, rftP}) => {
  return axios.post('/unauthorized-api/auth/res-session-state', {
    atkP,accidP, rftP
  });
};

const accessApi = {
    accessWeb
};
export default accessApi;
