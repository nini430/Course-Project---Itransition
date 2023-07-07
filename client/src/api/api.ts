const apiUrls = {
  auth: {
    register: `/auth/register`,
    login: `/auth/login`,
    refreshToken: `/auth/refresh-token`,
    logout:`/auth/logout`,
    profileImageUpload:'/auth/profile/upload',
    userInfoUpdate:'/auth/profile/update',
    getFollows:'/auth/profile/follows'
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
    getMyItems:'/item/my-items',
    filter:'/item/filter',
    sort:'/item/sort'
  },
  user:{
    getUser:'/user',
    toggleFollowUser:'/user'
  },
  admin:{
    getUsers:'/admin/users',
    filterUsers:'/admin/filter-users',
    editUser:'/admin/edit-user',
    changeStatus:'/admin/change-status',
    addUser:'/admin/add-user'
  },
  comment:{
    addComment:'/comment',
    editComment:'/comment',
    removeComment:'/comment'
  },
  itemReaction:{
    addReaction:'/item-reaction',
    unreactItem:'/item-reaction',
  },
  commentReaction:{
    addReaction:'/comment-reaction',
    unreactComment:'/comment-reaction'
  },
  chat:{
    getCurrentConversations:'/chat/conversations',
    sendMessage:'/chat/add-message',
    getMessages:'/chat/messages',
    getMyFollows:'/chat/my-follows',
    getOnlineUsers:'/chat/online-users'
  }
};

export default apiUrls;
