import axios, { AxiosResponse } from 'axios'
import { ApiJasei } from '../api.jasei'
import { VideoInterface } from '../../../interfaces/video'
import { ApiResponseDataInterface } from '../../../interfaces/IApiResponse'

const route = 'video'

export async function getAllVideo(): Promise<
  AxiosResponse<ApiResponseDataInterface>
> {
  return new Promise(async (resolve, reject) => {
    const url = `${ApiJasei}/${route}/get/all`
    axios
      .get(url)
      .then(resData => {
        resolve(resData as any)
      })
      .catch(error => {
        reject(error)
      })
  })
}
export async function getAllVideoByTerm(
  term: string
): Promise<AxiosResponse<ApiResponseDataInterface>> {
  return new Promise(async (resolve, reject) => {
    const url = `${ApiJasei}/${route}/search/all/${term}`
    if (term) {
      axios
        .get(url)
        .then(resData => {
          resolve(resData as any)
        })
        .catch(error => {
          reject(error)
        })
    }
  })
}

export async function getVideo(email: string): Promise<VideoInterface> {
  return new Promise(async (resolve, reject) => {
    const url = `${ApiJasei}/${route}/get/`
    if (email) {
      axios
        .post(url, email)
        .then(resData => {
          resolve(resData as any)
        })
        .catch(error => {
          reject(error)
        })
    }
  })
}

export function createVideo(
  dataToSave: VideoInterface
): Promise<AxiosResponse<ApiResponseDataInterface>> {
  return new Promise((resolve, reject) => {
    const url = `${ApiJasei}/${route}/create`
    axios
      .post(url, dataToSave)
      .then(resData => {
        resolve(resData)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export async function updateVideo(
  documentId: string,
  dataToSave: VideoInterface
): Promise<AxiosResponse<ApiResponseDataInterface>> {
  return new Promise((resolve, reject) => {
    const url = `${ApiJasei}/${route}/update/${documentId}`
    axios
      .put(url, dataToSave)
      .then(resData => {
        resolve(resData)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export async function deleteVideo(
  documentId: string
): Promise<AxiosResponse<ApiResponseDataInterface>> {
  return new Promise(async (resolve, reject) => {
    const url = `${ApiJasei}/${route}/delete/${documentId}`
    axios
      .delete(url)
      .then(resData => {
        resolve(resData)
      })
      .catch(error => {
        reject(error)
      })
  })
}
