const apiUrls = {
  auth: {
    register: `/auth/register`,
    login: `/auth/login`,
    refreshToken: `/auth/refresh-token`,
    logout:`/auth/logout`,
    profileImageUpload:'/auth/profile/upload',
    userInfoUpdate:'/auth/profile/update'
  },
  test: {
    test: '/test',
  },
  collection:{
    topics:`/collection/topics`,
    add:'/collection',
    addConfig:'/collection/configs',
    latest:'/collection/largest',
    myCollections:'collection/my-collections',
    removeCollection:'collection',
    getCollection:'collection',
    uploadCollectionImage:'collection/upload'
  },
  item:{
    initialize:'/item',
    add:'/item',
    tags:'/item/tags',
    latest:'/item/latest',
    getSingleItem:'/item/single',
    editItem:'/item',
    removeItem:'/item',
  },
  user:{
    getUser:'/user'
  },
  comment:{
    addComment:'/comment',
    editComment:'/comment',
    removeComment:'/comment'
  }
};

export default apiUrls;
