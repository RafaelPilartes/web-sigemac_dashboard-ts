import { AxiosResponse } from 'axios'
import { CategoryInterface } from '../interfaces/category'
import { CategoryRepository } from '../repository/repositoryApi/categoryRepository'
import { ApiResponseDataInterface } from '../interfaces/IApiResponse'

export class CategoryViewModel {
  private repositoryCategory: CategoryRepository

  constructor() {
    this.repositoryCategory = new CategoryRepository()
  }

  getAllCategoryData(): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryCategory
        .getAllCategoryRepository()
        .then(result => {
          resolve(result as any)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  getAllCategoryByTermData(
    term: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryCategory
        .getAllCategoryByTermRepository(term)
        .then(result => {
          resolve(result as any)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  getCategoryData(
    id: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryCategory
        .getCategoryAccountRepository(id)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  createCategory(
    dataToSave: CategoryInterface
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryCategory
        .createCategoryRepository(dataToSave)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  updateCategoryData(
    documentId: string,
    dataToSave: CategoryInterface
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryCategory
        .updateCategoryRepository(documentId, dataToSave)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  deleteCategoryData(
    documentId: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryCategory
        .deleteCategoryAccountRepository(documentId)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
