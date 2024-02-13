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
export const GET_USER_BY_USERNAME = (username: string) => `/user/?username=${username}`;

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
export const GET_CHANNEL = (channelName: string) => `/channel/?channelName=${channelName}`;
export const CREATE_CHANNEL = "/channel/";
export const UPDATE_CHANNEL = (channelId: string) => `/channel/channel/?channelId=${channelId}`;
export const DELETE_CHANNEL = (channelId: string) => `/channel/channel/?channelId=${channelId}`;
export const GET_CATEGORIES_BY_CHANNEL = (channelId: string) => `/channel/categoriesByChannel/?channelId=${channelId}`;
export const REMOVE_CATEGORY_FROM_CHANNEL = "/channel/categories/remove-channel/";
export const GET_POSTS_BY_CHANNEL = (channelName: string) => `/channel/postsByChannel/?channelName=${channelName}`
export const SEARCH_CHANNELS = (searchTerm: string) => `/search/categories?channelName=${searchTerm}`

// Post related endpoints
export const CREATE_POST = "/post";
export const GET_POST_BY_SLUG = (slug: string) => `/post/?slug=${slug}`;
export const UPDATE_POST = (slug: string) => `/post/?slug=${slug}`;
export const DELETE_POST = (slug: string) => `/post/?slug=${slug}`;
export const GET_POSTS_BY_USER = (userId: string) => `/post/postsByUser/?userId=${userId}`;
export const GET_POSTS_BY_USERNAME = (username: string) => `/post/postsByUsername/?username=${username}`;

// Comment related endpoints
export const CREATE_COMMENT = "/threads/comment";
export const GET_COMMENTS_BY_POST = (postId: string) => `/threads/comments/?postId=${postId}`;
export const DELETE_COMMENT = (commentId: string) => `/threads/comment/?commentId=${commentId}`;
export const UPDATE_COMMENT = "/threads/comment";

// Feed related endpoints
export const GET_FEED = "/feed";
export const GET_TOP_USERS = "/feed/topUsers";

// Search related endpoints
export const SEARCH = (query: string) => `/search/?q=${query}`;
export const SEARCH_TAG = (tag: string) => `/search/tag/?tag=${tag}`;

// Thread related endpoints
export const GET_THREADS = "/threads/";