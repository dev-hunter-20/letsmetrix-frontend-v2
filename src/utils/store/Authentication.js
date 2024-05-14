const currentUserKey = 'current-user';
const currentUNKey = 'current-un-Key';
const currentSubcriptionKey = 'current-subscription';

function setToken(token) {
  localStorage.setItem('accessToken', token);
}
function getAccessToken() {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('accessToken');
  } else {
    return null;
  }
}
function setAccessToken(accessToken) {
  return localStorage.setItem('accessToken', accessToken);
}
function setRefreshToken(refreshToken) {
  localStorage.setItem('refreshToken', refreshToken);
}
function getRefreshToken() {
  return localStorage.getItem('refreshToken');
}

function removeToken() {
  localStorage.removeItem('accessToken');
}

function removeRefreshToken() {
  localStorage.removeItem('refreshToken');
}

function setCurrentUser(currentUser) {
  localStorage.setItem(currentUserKey, currentUser);
}

function getCurrentUser() {
  return localStorage.getItem(currentUserKey);
}

function setCurrentUserName(currentUser) {
  localStorage.setItem(currentUNKey, currentUser);
}

function getCurrentUserName() {
  return localStorage.getItem(currentUNKey);
}

function removeCurrentUserName() {
  return localStorage.removeItem(currentUNKey);
}

function setCurrentSubscription(currentSubType) {
  localStorage.setItem(currentSubcriptionKey, currentSubType);
}

function getCurrentSubscription() {
  return localStorage.getItem(currentSubcriptionKey);
}

function removeCurrentSubscription() {
  localStorage.removeItem(currentSubcriptionKey);
}

function removeCurrentUser() {
  localStorage.removeItem(currentUserKey);
}

function isAuthenticated() {
  return getAccessToken() !== undefined && getAccessToken() !== null;
}

let Auth = {
  setToken: setToken,
  setCurrentUser: setCurrentUser,
  getCurrentUser: getCurrentUser,
  setCurrentUserName: setCurrentUserName,
  getCurrentUserName: getCurrentUserName,
  setCurrentSubscription: setCurrentSubscription,
  getCurrentSubscription: getCurrentSubscription,
  getAccessToken: getAccessToken,
  setRefreshToken: setRefreshToken,
  getRefreshToken: getRefreshToken,
  isAuthenticated: isAuthenticated,
  setAccessToken: setAccessToken,
  logout() {
    removeToken();
    removeCurrentUser();
    removeRefreshToken();
    removeCurrentUserName();
    removeCurrentSubscription();
  },
};
export default Auth;
