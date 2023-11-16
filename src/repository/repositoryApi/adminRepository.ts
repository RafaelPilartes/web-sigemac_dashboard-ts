import { AxiosResponse } from 'axios'
import { AdminInterface } from '../../interfaces/IAdmin'
import {
  createAdmin,
  deleteAdmin,
  getAdmin,
  getAllAdmin,
  getAllAdminByTerm,
  updateAdmin
} from '../../modules/Api/Dao/Admin'
import { ApiResponseDataInterface } from '../../interfaces/IApiResponse'

export class AdminRepository {
  getAllAdminRepository = async (): Promise<
    AxiosResponse<ApiResponseDataInterface>
  > => {
    return getAllAdmin()
  }
  getAllAdminByTermRepository = async (
    term: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> => {
    return getAllAdminByTerm(term)
  }
  getAdminAccountRepository = async (
    email: string
  ): Promise<AdminInterface> => {
    return getAdmin(email)
  }
  createAdminRepository = async (
    adminData: AdminInterface
  ): Promise<AxiosResponse<ApiResponseDataInterface>> => {
    return new Promise((resolve, reject) => {
      createAdmin(adminData)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  updateAdminRepository(
    documentId: string,
    dataToSave: AdminInterface
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      updateAdmin(documentId, dataToSave)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  deleteAdminAccountRepository = async (
    documentId: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> => {
    return new Promise((resolve, reject) => {
      deleteAdmin(documentId)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
