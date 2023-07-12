const routesPath={
    main:'/',
    register:'/register',
    profile:'/profile/:userId',
    login:'/login',
    addCollection:'/add-collection',
    addItem:'/add-item/:collectionId',
    editItem:'/edit-item/:itemId',
    collectionDetails:'/collection/:collectionId',
    itemDetails:'/item/:itemId',
    settings:'/settings',
    messenger:'/messenger',
    admin:'/admin',
    addUser:'/add-user',
    editUser:'/edit-user/:userId',
    search:'/search',
    forgotPassword:'/forgot-password',
    resetPassword:'/reset-password/:token',
    expiredLink:'/expired',
    verifyEmail:'/verify-email',
    verifyEmailAction:'/verify-email/:token',
    redirectPage:'/redirect'
}

export default routesPath;