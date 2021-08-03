// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  registerUrl: 'http://localhost:8080/register',
  loginUrl: 'http://localhost:8080/login',
  findUserUrl: 'http://localhost:8080/findByName',
  newPostUrl: 'http://localhost:8080/addPost',
  updateUser: 'http://localhost:8080/update',
  updateProfileImage: 'http://localhost:8080/updateImage',
  allPostsUrl: 'http://localhost:8080/getAllPosts',
  myPostsUrl: 'http://localhost:8080/myPosts',
  likePostUrl: 'http://localhost:8080/like',
  getAllUsersUrl: 'http://localhost:8080/allUsers',
  followUrl: 'http://localhost:8080/follow',
  followListUrl: 'http://localhost:8080/followList',
  likesNbUrl: 'http://localhost:8080/likesNb',
  deleteLikeUrl: 'http://localhost:8080/deleteLike',
  myFriendsPostsUrl: 'http://localhost:8080/getFriendsPosts'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
