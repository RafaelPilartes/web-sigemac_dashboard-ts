import { AxiosResponse } from 'axios'
import { CategoryInterface } from '../../interfaces/category'
import {
  createCategory,
  deleteCategory,
  getCategory,
  getAllCategory,
  getAllCategoryByTerm,
  updateCategory
} from '../../modules/Api/Dao/Category'
import { ApiResponseDataInterface } from '../../interfaces/IApiResponse'

export class CategoryRepository {
  getAllCategoryRepository = async (): Promise<
    AxiosResponse<ApiResponseDataInterface>
  > => {
    return getAllCategory()
  }
  getAllCategoryByTermRepository = async (
    term: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> => {
    return getAllCategoryByTerm(term)
  }
  getCategoryAccountRepository = async (
    id: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> => {
    return getCategory(id)
  }
  createCategoryRepository = async (
    categoryData: CategoryInterface
  ): Promise<AxiosResponse<ApiResponseDataInterface>> => {
    return new Promise((resolve, reject) => {
      createCategory(categoryData)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  updateCategoryRepository(
    documentId: string,
    dataToSave: CategoryInterface
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      updateCategory(documentId, dataToSave)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  deleteCategoryAccountRepository = async (
    documentId: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> => {
    return new Promise((resolve, reject) => {
      deleteCategory(documentId)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
