import { AxiosResponse } from 'axios'
import { TagInterface } from '../../interfaces/tag'
import {
  createTag,
  deleteTag,
  getTag,
  getAllTag,
  getAllTagByTerm,
  updateTag
} from '../../modules/Api/Dao/Tag'
import { ApiResponseDataInterface } from '../../interfaces/IApiResponse'

export class TagRepository {
  getAllTagRepository = async (): Promise<
    AxiosResponse<ApiResponseDataInterface>
  > => {
    return getAllTag()
  }
  getAllTagByTermRepository = async (
    term: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> => {
    return getAllTagByTerm(term)
  }
  getTagAccountRepository = async (email: string): Promise<TagInterface> => {
    return getTag(email)
  }
  createTagRepository = async (
    tagData: TagInterface
  ): Promise<AxiosResponse<ApiResponseDataInterface>> => {
    return new Promise((resolve, reject) => {
      createTag(tagData)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  updateTagRepository(
    documentId: string,
    dataToSave: TagInterface
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      updateTag(documentId, dataToSave)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  deleteTagAccountRepository = async (
    documentId: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> => {
    return new Promise((resolve, reject) => {
      deleteTag(documentId)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
