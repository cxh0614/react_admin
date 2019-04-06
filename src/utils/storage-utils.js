
const USER_KEY = 'uesr';

//保存用户信息的方法
export function setItem(value) {
  if (value && typeof value !== 'function') {
    localStorage.setItem(USER_KEY, JSON.stringify(value));
  } else {
    console.log('保存用户数据失败', value);
  }
}

//读取用户信息的方法
export function getItem() {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : '';
}

//删除用户信息的方法
export function removeItem() {
  if (getItem()) {
    localStorage.removeItem(USER_KEY);
  }
}