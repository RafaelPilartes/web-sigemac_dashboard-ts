import { ApiResponseDataInterface } from '../interfaces/IApiResponse'
import { UploadRepository } from '../repository/repositoryApi/uploadRepository'

export class UploadViewModel {
  private repositoryUpload: UploadRepository

  constructor() {
    this.repositoryUpload = new UploadRepository()
  }

  // Admin
  uploadImageAdmin(imageToSave: FormData): Promise<ApiResponseDataInterface> {
    return new Promise((resolve, reject) => {
      this.repositoryUpload
        .uploadImageAdminRepository(imageToSave)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  // User
  uploadImageUser(imageToSave: FormData): Promise<ApiResponseDataInterface> {
    return new Promise((resolve, reject) => {
      this.repositoryUpload
        .uploadImageUserRepository(imageToSave)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  // Author
  uploadImageAuthor(imageToSave: FormData): Promise<ApiResponseDataInterface> {
    return new Promise((resolve, reject) => {
      this.repositoryUpload
        .uploadImageAuthorRepository(imageToSave)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  // Video
  uploadImageVideo(imageToSave: FormData): Promise<ApiResponseDataInterface> {
    return new Promise((resolve, reject) => {
      this.repositoryUpload
        .uploadImageVideoRepository(imageToSave)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  // Opinion
  uploadImageOpinion(imageToSave: FormData): Promise<ApiResponseDataInterface> {
    return new Promise((resolve, reject) => {
      this.repositoryUpload
        .uploadImageOpinionRepository(imageToSave)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  // Category
  uploadImageCategory(
    imageToSave: FormData
  ): Promise<ApiResponseDataInterface> {
    return new Promise((resolve, reject) => {
      this.repositoryUpload
        .uploadImageCategoryRepository(imageToSave)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  // News
  uploadImageNews(imageToSave: FormData): Promise<ApiResponseDataInterface> {
    return new Promise((resolve, reject) => {
      this.repositoryUpload
        .uploadImageNewsRepository(imageToSave)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
