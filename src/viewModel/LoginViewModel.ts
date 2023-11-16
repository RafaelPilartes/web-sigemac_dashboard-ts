import { AxiosResponse } from 'axios'
import { AdminInterface } from '../interfaces/admin'
import { ApiResponseDataInterface } from '../interfaces/IApiResponse'
import { AdminRepository } from '../repository/repositoryApi/adminRepository'
import { LoginRepository } from '../repository/repositoryApi/loginRepository'

export class LoginViewModel {
  private repositoryLogin: LoginRepository
  private repositoryAdmin: AdminRepository

  constructor() {
    this.repositoryLogin = new LoginRepository()
    this.repositoryAdmin = new AdminRepository()
  }

  getAdminData(email: string): Promise<AdminInterface> {
    return new Promise((resolve, reject) => {
      this.repositoryAdmin
        .getAdminAccountRepository(email)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  signInWithEmail(
    email: string,
    password: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryLogin
        .signInWithEmail(email, password)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
