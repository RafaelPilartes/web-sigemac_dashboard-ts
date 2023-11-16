import { AxiosResponse } from 'axios'
import { UserInterface } from '../interfaces/IUser'
import { UserRepository } from '../repository/repositoryApi/userRepository'
import { ApiResponseDataInterface } from '../interfaces/IApiResponse'

export class UserViewModel {
  private repositoryUser: UserRepository

  constructor() {
    this.repositoryUser = new UserRepository()
  }

  getAllUserData(): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryUser
        .getAllUserRepository()
        .then(result => {
          resolve(result as any)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  getAllUserByTermData(
    term: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryUser
        .getAllUserByTermRepository(term)
        .then(result => {
          resolve(result as any)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  getUserData(email: string): Promise<UserInterface> {
    return new Promise((resolve, reject) => {
      this.repositoryUser
        .getUserAccountRepository(email)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  createUser(
    dataToSave: UserInterface
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryUser
        .createUserRepository(dataToSave)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  updateUserData(
    documentId: string,
    dataToSave: UserInterface
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryUser
        .updateUserRepository(documentId, dataToSave)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  deleteUserData(
    documentId: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryUser
        .deleteUserAccountRepository(documentId)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
