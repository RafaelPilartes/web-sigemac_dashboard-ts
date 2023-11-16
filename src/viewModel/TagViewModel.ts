import { AxiosResponse } from 'axios'
import { TagInterface } from '../interfaces/tag'
import { TagRepository } from '../repository/repositoryApi/tagRepository'
import { ApiResponseDataInterface } from '../interfaces/IApiResponse'

export class TagViewModel {
  private repositoryTag: TagRepository

  constructor() {
    this.repositoryTag = new TagRepository()
  }

  getAllTagData(): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryTag
        .getAllTagRepository()
        .then(result => {
          resolve(result as any)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  getAllTagByTermData(
    term: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryTag
        .getAllTagByTermRepository(term)
        .then(result => {
          resolve(result as any)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  getTagData(email: string): Promise<TagInterface> {
    return new Promise((resolve, reject) => {
      this.repositoryTag
        .getTagAccountRepository(email)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  createTag(
    dataToSave: TagInterface
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryTag
        .createTagRepository(dataToSave)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  updateTagData(
    documentId: string,
    dataToSave: TagInterface
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryTag
        .updateTagRepository(documentId, dataToSave)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  deleteTagData(
    documentId: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryTag
        .deleteTagAccountRepository(documentId)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
