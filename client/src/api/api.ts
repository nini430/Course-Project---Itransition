const apiUrls = {
  auth: {
    register: `/auth/register`,
    login: `/auth/login`,
    refreshToken: `/auth/refresh-token`,
    logout:`/auth/logout`,
    profileImageUpload:'/auth/profile/upload',
    userInfoUpdate:'/auth/profile/update',
    getFollows:'/auth/profile/follows',
    forgotPassword:'/auth/forgot-password',
    resetPassword:'/auth/reset-password',
    resetPasswordAction:'/auth/reset-password-action',
    verifyEmail:'/auth/verify-email',
    verifyEmailAction:'/auth/verify-email-action',
    getMyPassportUser:'/auth/my-passport-user'
  },
  test: {
    test: '/test',
  },
  collection:{
    topics:`/collection/topics`,
    add:'/collection',
    addConfig:'/collection/configs',
    latest:'/collection/largest',
    myCollections:'/collection/my-collections',
    removeCollection:'/collection',
    getCollection:'/collection',
    uploadCollectionImage:'/collection/upload',
    getCollectionExtended:'/collection/extended',
    updateCollection:'/collection'
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
    sort:'/item/sort',
    removeItems:'/item/remove-items'
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
    changeRole:'/admin/change-role',
    addUser:'/admin/add-user',
    sortUsers:'/admin/sort-users'
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
  search:{
    getFullText:'/search'
  }
};

export default apiUrls;
