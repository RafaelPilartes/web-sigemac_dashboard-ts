import { AxiosResponse } from 'axios'
import { AuthorInterface } from '../interfaces/author'
import { AuthorRepository } from '../repository/repositoryApi/authorRepository'
import { ApiResponseDataInterface } from '../interfaces/IApiResponse'

export class AuthorViewModel {
  private repositoryAuthor: AuthorRepository

  constructor() {
    this.repositoryAuthor = new AuthorRepository()
  }

  getAllAuthorData(): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryAuthor
        .getAllAuthorRepository()
        .then(result => {
          resolve(result as any)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  getAllAuthorByTermData(
    term: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryAuthor
        .getAllAuthorByTermRepository(term)
        .then(result => {
          resolve(result as any)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  getAuthorData(id: string): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryAuthor
        .getAuthorAccountRepository(id)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  createAuthor(
    dataToSave: AuthorInterface
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryAuthor
        .createAuthorRepository(dataToSave)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  updateAuthorData(
    documentId: string,
    dataToSave: AuthorInterface
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryAuthor
        .updateAuthorRepository(documentId, dataToSave)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  deleteAuthorData(
    documentId: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryAuthor
        .deleteAuthorAccountRepository(documentId)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
