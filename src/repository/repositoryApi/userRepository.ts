import { AxiosResponse } from 'axios'
import { UserInterface } from '../../interfaces/IUser'
import {
  createUser,
  deleteUser,
  getUser,
  getAllUser,
  getAllUserByTerm,
  updateUser
} from '../../modules/Api/Dao/User'
import { ApiResponseDataInterface } from '../../interfaces/IApiResponse'

export class UserRepository {
  getAllUserRepository = async (): Promise<
    AxiosResponse<ApiResponseDataInterface>
  > => {
    return getAllUser()
  }
  getAllUserByTermRepository = async (
    term: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> => {
    return getAllUserByTerm(term)
  }
  getUserAccountRepository = async (email: string): Promise<UserInterface> => {
    return getUser(email)
  }
  createUserRepository = async (
    userData: UserInterface
  ): Promise<AxiosResponse<ApiResponseDataInterface>> => {
    return new Promise((resolve, reject) => {
      createUser(userData)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  updateUserRepository(
    documentId: string,
    dataToSave: UserInterface
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      updateUser(documentId, dataToSave)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  deleteUserAccountRepository = async (
    documentId: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> => {
    return new Promise((resolve, reject) => {
      deleteUser(documentId)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
