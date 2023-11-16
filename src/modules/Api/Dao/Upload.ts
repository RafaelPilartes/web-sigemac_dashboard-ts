import axios from 'axios'
import { ApiJasei } from '../api.jasei'
import { ApiResponseDataInterface } from '../../../interfaces/IApiResponse'

// Admin
export function uploadImageAdmin(
  imageToSave: any
): Promise<ApiResponseDataInterface> {
  return new Promise((resolve, reject) => {
    const url = `${ApiJasei}/upload/image/admin`
    axios
      .post(url, imageToSave)
      .then(resData => {
        resolve(resData.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

// User
export function uploadImageUser(
  imageToSave: any
): Promise<ApiResponseDataInterface> {
  return new Promise((resolve, reject) => {
    const url = `${ApiJasei}/upload/image/user`
    axios
      .post(url, imageToSave)
      .then(resData => {
        resolve(resData.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

// Author
export function uploadImageAuthor(
  imageToSave: any
): Promise<ApiResponseDataInterface> {
  return new Promise((resolve, reject) => {
    const url = `${ApiJasei}/upload/image/author`
    axios
      .post(url, imageToSave)
      .then(resData => {
        resolve(resData.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

// Video
export function uploadImageVideo(
  imageToSave: any
): Promise<ApiResponseDataInterface> {
  return new Promise((resolve, reject) => {
    const url = `${ApiJasei}/upload/image/cover/video`
    axios
      .post(url, imageToSave)
      .then(resData => {
        resolve(resData.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

// Opinion
export function uploadImageOpinion(
  imageToSave: any
): Promise<ApiResponseDataInterface> {
  return new Promise((resolve, reject) => {
    const url = `${ApiJasei}/upload/image/cover/opinion`
    axios
      .post(url, imageToSave)
      .then(resData => {
        resolve(resData.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

// Category
export function uploadImageCategory(
  imageToSave: any
): Promise<ApiResponseDataInterface> {
  return new Promise((resolve, reject) => {
    const url = `${ApiJasei}/upload/image/category`
    axios
      .post(url, imageToSave)
      .then(resData => {
        resolve(resData.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

// News
export function uploadImageNews(
  imageToSave: any
): Promise<ApiResponseDataInterface> {
  return new Promise((resolve, reject) => {
    const url = `${ApiJasei}/upload/images/news`
    axios
      .post(url, imageToSave)
      .then(resData => {
        resolve(resData.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
