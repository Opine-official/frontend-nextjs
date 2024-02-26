// User related endpoints
export const LOGIN = "/user/login";
export const LOGOUT = "/user/logout";
export const REGISTER = "/user/register";
export const VERIFY_EMAIL = "/user/verifyEmail";
export const RESEND_OTP = "/user/resendOTP";
export const INITIATE_PASSWORD_RESET = "/user/initiatePasswordReset";
export const VERIFY_PASSWORD_RESET_CODE = "/user/verifyPasswordResetCode";
export const RESET_PASSWORD = "/user/resetPassword";
export const GET_USER = "/user/";
export const GET_USER_BY_USERNAME = (username: string) => `/user/${username}`;
export const REPORT_USER = "/user/report";

// Admin related endpoints
export const ADMIN_LOGIN = "/admin/login";
export const ADMIN_VERIFY = "/admin/verify";

// Channel related endpoints
export const CHANNEL_CATEGORIES = "/channel/categories";
export const CREATE_CATEGORY = "/channel/category";
export const UPDATE_CATEGORY = "/channel/category";
export const DELETE_CATEGORY = (categoryId: string) => `/channel/category/?categoryId=${categoryId}`;
export const GET_CHANNELS_BY_CATEGORY = (categoryId: string) => `/channel/channelsByCategory/?categoryId=${categoryId}`;
export const REMOVE_CHANNEL_FROM_CATEGORY = "/channel/channels/remove-category/";
export const GET_ALL_CHANNELS = "/channel/channels";
export const GET_CHANNEL = (channelName: string, userId: string) => `/channel/?channelName=${channelName}&&userId=${userId}`;
export const CREATE_CHANNEL = "/channel/";
export const UPDATE_CHANNEL = (channelId: string) => `/channel/channel/?channelId=${channelId}`;
export const DELETE_CHANNEL = (channelId: string) => `/channel/channel/?channelId=${channelId}`;
export const GET_CATEGORIES_BY_CHANNEL = (channelId: string) => `/channel/categoriesByChannel/?channelId=${channelId}`;
export const REMOVE_CATEGORY_FROM_CHANNEL = "/channel/categories/remove-channel/";
export const GET_POSTS_BY_CHANNEL = (channelName: string) => `/channel/postsByChannel/?channelName=${channelName}`
export const SEARCH_CHANNELS = (searchTerm: string) => `/channel/search/channels/?searchTerm=${searchTerm}`
export const SUBSCRIBE_CHANNEL = "/channel/subscribe";
export const UNSUBSCRIBE_CHANNEL = (userId: string, channelId: string) => `/channel/subscribe/?userId=${userId}&&channelId=${channelId}`

// Post related endpoints
export const CREATE_POST = "/post";
export const GET_POST_BY_SLUG = (slug: string) => `/post/?slug=${slug}`;
export const UPDATE_POST = (slug: string) => `/post/?slug=${slug}`;
export const DELETE_POST = (slug: string) => `/post/?slug=${slug}`;
export const GET_POSTS_BY_USER = (userId: string) => `/post/postsByUser/?userId=${userId}`;
export const GET_POSTS_BY_USERNAME = (username: string) => `/post/getPostsByUsername/?username=${username}`;
export const REPORT_POST = "/post/report";

// Comment related endpoints
export const CREATE_COMMENT = "/threads/comment";
export const GET_COMMENTS_BY_POST = (postId: string) => `/threads/comments/?postId=${postId}`;
export const DELETE_COMMENT = (commentId: string) => `/threads/comment/?commentId=${commentId}`;
export const UPDATE_COMMENT = "/threads/comment";
export const GET_COMMENTS_AND_POSTS_BY_USER = (userId: string) => `/threads/commentsAndPosts/?userId=${userId}`;

// Feed related endpoints
export const GET_FEED = (userId: string) => `/feed/?userId=${userId}`;
export const GET_TOP_USERS = "/feed/topUsers";

// Search related endpoints
export const SEARCH = (query: string) => `/search/?q=${query}`;
export const SEARCH_TAG = (tag: string) => `/search/tag/?tag=${tag}`;

// Thread related endpoints
export const GET_THREADS = "/threads/";

// Notification related endpoints
export const GET_NOTIFICATIONS = "/notification/user";
export const MARK_AS_READ = "/notification/markAsRead";

// Analytics related endpoints
export const GET_REGISTRATION_ANALYTICS = '/user/registrationAnalytics';
export const GET_POSTS_ANALYTICS = '/post/analytics';
export const GET_COMMENT_ANALYTICS = '/threads/analytics';