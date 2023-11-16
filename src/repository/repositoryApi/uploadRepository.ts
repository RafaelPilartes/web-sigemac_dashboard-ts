import { ApiResponseDataInterface } from '../../interfaces/IApiResponse'
import {
  uploadImageAdmin,
  uploadImageUser,
  uploadImageAuthor,
  uploadImageNews,
  uploadImageCategory,
  uploadImageVideo,
  uploadImageOpinion
} from '../../modules/Api/Dao/Upload'

export class UploadRepository {
  // Admin
  uploadImageAdminRepository = async (
    imageToSave: FormData
  ): Promise<ApiResponseDataInterface> => {
    const response = await uploadImageAdmin(imageToSave)
    return response
  }

  // User
  uploadImageUserRepository = async (
    imageToSave: FormData
  ): Promise<ApiResponseDataInterface> => {
    const response = await uploadImageUser(imageToSave)
    return response
  }

  // Author
  uploadImageAuthorRepository = async (
    imageToSave: FormData
  ): Promise<ApiResponseDataInterface> => {
    const response = await uploadImageAuthor(imageToSave)
    return response
  }

  // Video
  uploadImageVideoRepository = async (
    imageToSave: FormData
  ): Promise<ApiResponseDataInterface> => {
    const response = await uploadImageVideo(imageToSave)
    return response
  }

  // Opinion
  uploadImageOpinionRepository = async (
    imageToSave: FormData
  ): Promise<ApiResponseDataInterface> => {
    const response = await uploadImageOpinion(imageToSave)
    return response
  }

  // Category
  uploadImageCategoryRepository = async (
    imageToSave: FormData
  ): Promise<ApiResponseDataInterface> => {
    const response = await uploadImageCategory(imageToSave)
    return response
  }

  // News
  uploadImageNewsRepository = async (
    imageToSave: FormData
  ): Promise<ApiResponseDataInterface> => {
    const response = await uploadImageNews(imageToSave)
    return response
  }
}
