
const setUpAxios = (axiosObj) => {
  const token = localStorage.getItem('authToken');
  console.log(token);
  axiosObj. defaults.headers.common['Authorization'] = token;
  axiosObj.defaults.baseURL = 'http://localhost:6000';
};

export default setUpAxios;
