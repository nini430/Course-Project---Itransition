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
    add:'/collection',
    addConfig:'/collection/configs'
  },
  item:{
    initialize:'/item',
    add:'/item',
    tags:'/item/tags'
  }
};

export default apiUrls;
