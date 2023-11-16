import { AxiosResponse } from 'axios'
import { AuthorInterface } from '../../interfaces/author'
import {
  createAuthor,
  deleteAuthor,
  getAuthor,
  getAllAuthor,
  getAllAuthorByTerm,
  updateAuthor
} from '../../modules/Api/Dao/Author'
import { ApiResponseDataInterface } from '../../interfaces/IApiResponse'

export class AuthorRepository {
  getAllAuthorRepository = async (): Promise<
    AxiosResponse<ApiResponseDataInterface>
  > => {
    return getAllAuthor()
  }
  getAllAuthorByTermRepository = async (
    term: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> => {
    return getAllAuthorByTerm(term)
  }
  getAuthorAccountRepository = async (
    id: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> => {
    return getAuthor(id)
  }
  createAuthorRepository = async (
    authorData: AuthorInterface
  ): Promise<AxiosResponse<ApiResponseDataInterface>> => {
    return new Promise((resolve, reject) => {
      createAuthor(authorData)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  updateAuthorRepository(
    documentId: string,
    dataToSave: AuthorInterface
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      updateAuthor(documentId, dataToSave)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  deleteAuthorAccountRepository = async (
    documentId: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> => {
    return new Promise((resolve, reject) => {
      deleteAuthor(documentId)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
