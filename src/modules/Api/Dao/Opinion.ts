import axios, { AxiosResponse } from 'axios'
import { ApiJasei } from '../api.jasei'
import { OpinionInterface } from '../../../interfaces/opinion'
import { ApiResponseDataInterface } from '../../../interfaces/IApiResponse'

const route = 'opinion'

export async function getAllOpinion(): Promise<
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
export async function getAllOpinionByTerm(
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

export async function getOpinion(email: string): Promise<OpinionInterface> {
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

export function createOpinion(
  dataToSave: OpinionInterface
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

export async function updateOpinion(
  documentId: string,
  dataToSave: OpinionInterface
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

export async function deleteOpinion(
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
