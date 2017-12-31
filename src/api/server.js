import Axios from 'axios'
import Qs from 'qs'
import router from '../router'

const axios = Axios.create({
  baseURL: '/',
  transformRequest: [(data) => {
    data = Qs.stringify(data)
    return data
  }],
  withCredentials: true,
  /**
   * 设置Content-Type
   */
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})

axios.interceptors.request.use(
  config => {
    const user = localStore.get('user')
    if (user && user.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `Token token=${user.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  });

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401清除token信息并跳转到登录页面
          router.replace({
            path: 'login',
            query: { redirect: router.currentRoute.fullPath }
          })
          break
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  })

let base = 'onlinefront'
export const login = (params) => {
  return axios.post(`${base}/admin/teacher/login`, params).then((resp) => {
    let { msg, code, data } = resp.data
    if (code == 200) {
      const token = data.teacher.token
      localStore.set('user', data.teacher)
    }
    return resp
  })
}

export const logout = (params) => {
  localStore.clear()
}

export const classesAdd = (params) => {
  return axios.post(`${base}/admin/classes/save`, params)
}
