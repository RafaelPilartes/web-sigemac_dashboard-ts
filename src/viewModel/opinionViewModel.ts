import { AxiosResponse } from 'axios'
import { OpinionInterface } from '../interfaces/opinion'
import { OpinionRepository } from '../repository/repositoryApi/opinionRepository'
import { ApiResponseDataInterface } from '../interfaces/IApiResponse'

export class OpinionViewModel {
  private repositoryOpinion: OpinionRepository

  constructor() {
    this.repositoryOpinion = new OpinionRepository()
  }

  getAllOpinionData(): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryOpinion
        .getAllOpinionRepository()
        .then(result => {
          resolve(result as any)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  getAllOpinionByTermData(
    term: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryOpinion
        .getAllOpinionByTermRepository(term)
        .then(result => {
          resolve(result as any)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  getOpinionData(email: string): Promise<OpinionInterface> {
    return new Promise((resolve, reject) => {
      this.repositoryOpinion
        .getOpinionAccountRepository(email)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  createOpinion(
    dataToSave: OpinionInterface
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryOpinion
        .createOpinionRepository(dataToSave)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  updateOpinionData(
    documentId: string,
    dataToSave: OpinionInterface
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryOpinion
        .updateOpinionRepository(documentId, dataToSave)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  deleteOpinionData(
    documentId: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryOpinion
        .deleteOpinionAccountRepository(documentId)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
