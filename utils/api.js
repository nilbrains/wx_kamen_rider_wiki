export const method = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  DELETE: "DELETE"
}

export const WXAPPLOGIN = "/protal/wx/login"
/**
 * 最新骑士信息
 */
export const RIDER_INFO_NEW = "/rider/info/new";

export const RIDER_INFO_LIST = "/rider/info/list";

export const BIND_ACCOUNT = "/protal/wx/bind";

export const CREATE_USER = "/protal/u/register";

export const MODIFY_USER_DATA = "/protal/u/modify";

export const RIDER_EP = (who) => `/rider/${who}/ep`

export const RIDER_INFO = (who) => `/rider/${who}/info`

export const INDEX_SWIPES = "/admin/app/swipe-img/1"

export const ARTICLE = (id) => `/admin/app/article/${id}`

export const V_CODE = `/protal/wx/code`;

export const COMMENT_SUBMIT = `/protal/app/comment`;

export const SEND_MAIL_CODE = "/protal/mail/send-code";