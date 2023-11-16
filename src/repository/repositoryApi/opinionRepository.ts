import { AxiosResponse } from 'axios'
import { OpinionInterface } from '../../interfaces/opinion'
import {
  createOpinion,
  deleteOpinion,
  getOpinion,
  getAllOpinion,
  getAllOpinionByTerm,
  updateOpinion
} from '../../modules/Api/Dao/Opinion'
import { ApiResponseDataInterface } from '../../interfaces/IApiResponse'

export class OpinionRepository {
  getAllOpinionRepository = async (): Promise<
    AxiosResponse<ApiResponseDataInterface>
  > => {
    return getAllOpinion()
  }
  getAllOpinionByTermRepository = async (
    term: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> => {
    return getAllOpinionByTerm(term)
  }
  getOpinionAccountRepository = async (
    email: string
  ): Promise<OpinionInterface> => {
    return getOpinion(email)
  }
  createOpinionRepository = async (
    opinionData: OpinionInterface
  ): Promise<AxiosResponse<ApiResponseDataInterface>> => {
    return new Promise((resolve, reject) => {
      createOpinion(opinionData)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  updateOpinionRepository(
    documentId: string,
    dataToSave: OpinionInterface
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      updateOpinion(documentId, dataToSave)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  deleteOpinionAccountRepository = async (
    documentId: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> => {
    return new Promise((resolve, reject) => {
      deleteOpinion(documentId)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
