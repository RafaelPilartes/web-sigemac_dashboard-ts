import { AxiosResponse } from 'axios'
import { NewsInterface } from '../interfaces/news'
import { NewsRepository } from '../repository/repositoryApi/newsRepository'
import { ApiResponseDataInterface } from '../interfaces/IApiResponse'

export class NewsViewModel {
  private repositoryNews: NewsRepository

  constructor() {
    this.repositoryNews = new NewsRepository()
  }

  getAllNewsData(): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryNews
        .getAllNewsRepository()
        .then(result => {
          resolve(result as any)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  getAllNewsByTermData(
    term: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryNews
        .getAllNewsByTermRepository(term)
        .then(result => {
          resolve(result as any)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  getNewsData(email: string): Promise<NewsInterface> {
    return new Promise((resolve, reject) => {
      this.repositoryNews
        .getNewsAccountRepository(email)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  createNews(
    dataToSave: NewsInterface
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryNews
        .createNewsRepository(dataToSave)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  updateNewsData(
    documentId: string,
    dataToSave: NewsInterface
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryNews
        .updateNewsRepository(documentId, dataToSave)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  deleteNewsData(
    documentId: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryNews
        .deleteNewsAccountRepository(documentId)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
