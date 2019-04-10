import jsonp from 'jsonp';
import ajax from './ajax';

//区分开发环境和生产环境
const prefix = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:5000';

//请求登录函数
export const reqLogin = (username, password) => ajax(prefix + '/login', { username, password }, 'POST');

//请求天气函数
export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    jsonp(
      `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,
      (err, data) => {
        if (!err) {
          const { dayPictureUrl, weather } = data.results[0].weather_data[0];
          resolve({weather, weatherImg: dayPictureUrl});
        } else {
          reject('请求失败，网络不稳定~');
        }
      }
    )
  })
}

//请求分列表的数据函数
export const reqGetCategories = (parentId) => ajax(prefix + '/manage/category/list', {parentId});

//请求添加分类的函数
export const reqAddCategory = (parentId, categoryName) => ajax(prefix + '/manage/category/add', {parentId, categoryName}, 'POST');

//请求修改分类名称的函数
export const reqUpdateCategoryName = (categoryId, categoryName) => ajax(prefix + '/manage/category/update', {categoryId, categoryName}, 'POST');

//请求获取产品数据的函数
export const reqgetProducts = (pageNum, pageSize) => ajax(prefix + '/manage/product/list', {pageNum, pageSize});

//请求添加产品数据的函数
export const reqAddProduct= (product) => ajax(prefix + '/manage/product/add', product, 'POST');

//请求删除图片的函数
export const reqDelImage= (name, id) => ajax(prefix + '/manage/img/delete', {name, id}, 'POST');

//请求修改产品数据函数
export const reqUpdateProduct= (product) => ajax(prefix + '/manage/product/update', product, 'POST');