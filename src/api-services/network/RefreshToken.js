import { URL_API } from "../../constants/ApiUrl";
import Auth from "../../utils/store/Authentication";

const RefreshToken = async () => {
  if (!Auth.getRefreshToken()) {
    return (window.location.href = '/login');
  }
  const api = `${URL_API}refresh`;
  try {
    if (responseRefresh) {
      return console.log('next');
    }
    responseRefresh = await fetch(api, {
      method: 'post',
      headers: new Headers({
        Authorization: `Bearer ${Auth.getRefreshToken()}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });
    const res = await responseRefresh.json();
    if (res.code === 0) {
      Auth.setAccessToken(res.token);
      return {
        success: true,
        access_token: res.token,
      };
    }

    if (responseRefresh.status === 500) {
      Auth.logout();
      window.location.href = '/login';
    }
    return {
      success: false,
      message: 'Server error',
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  } finally {
    responseRefresh = undefined;
  }
};

export default RefreshToken;
