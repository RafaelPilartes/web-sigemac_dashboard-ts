import axios, { AxiosResponse } from 'axios'
import { ApiJasei } from '../api.jasei'
import { UserInterface } from '../../../interfaces/user'
import { ApiResponseDataInterface } from '../../../interfaces/IApiResponse'

const route = 'user'

export async function userExisteByEmail(email: string): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    const url = `${ApiJasei}/${route}/get`
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

export async function getAllUser(): Promise<
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
export async function getAllUserByTerm(
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

export async function getUser(email: string): Promise<UserInterface> {
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

export function createUser(
  dataToSave: UserInterface
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

export async function updateUser(
  documentId: string,
  dataToSave: UserInterface
): Promise<AxiosResponse<ApiResponseDataInterface>> {
  return new Promise((resolve, reject) => {
    const url = `${ApiJasei}/${route}/update/${documentId}`
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

export async function deleteUser(
  documentId: string
): Promise<AxiosResponse<ApiResponseDataInterface>> {
  return new Promise(async (resolve, reject) => {
    const url = `${ApiJasei}/${route}/delete/${documentId}`
    axios
      .post(url)
      .then(resData => {
        resolve(resData)
      })
      .catch(error => {
        reject(error)
      })
  })
}
