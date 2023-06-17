const apiUrls = {
  auth: {
    register: `/auth/register`,
    login: `/auth/login`,
    refreshToken: `/auth/refresh-token`,
    logout:`/auth/logout`
  },
  test: {
    test: '/test',
  },
  collection:{
    topics:`/collection/topics`,
    add:'/collection'
  }
};

export default apiUrls;
