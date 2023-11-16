import axios, { AxiosResponse } from 'axios'
import { ApiJasei } from '../api.jasei'
import { AdminInterface } from '../../../interfaces/admin'
import { ApiResponseDataInterface } from '../../../interfaces/IApiResponse'

const route = 'admin'

export async function adminExisteByEmail(email: string): Promise<boolean> {
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

export async function getAllAdmin(): Promise<
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
export async function getAllAdminByTerm(
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

export async function getAdmin(email: string): Promise<AdminInterface> {
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

export function createAdmin(
  dataToSave: AdminInterface
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

export async function updateAdmin(
  documentId: string,
  dataToSave: AdminInterface
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

export async function deleteAdmin(
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
