import axios, { AxiosResponse } from 'axios'
import { ApiJasei } from '../api.jasei'
import { AuthorInterface } from '../../../interfaces/author'
import { ApiResponseDataInterface } from '../../../interfaces/IApiResponse'

const route = 'author'

export async function getAllAuthor(): Promise<
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
export async function getAllAuthorByTerm(
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

export async function getAuthor(
  id: string
): Promise<AxiosResponse<ApiResponseDataInterface>> {
  return new Promise(async (resolve, reject) => {
    const url = `${ApiJasei}/${route}/get/one/${id}`
    if (id) {
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

export function createAuthor(
  dataToSave: AuthorInterface
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

export async function updateAuthor(
  documentId: string,
  dataToSave: AuthorInterface
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

export async function deleteAuthor(
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
