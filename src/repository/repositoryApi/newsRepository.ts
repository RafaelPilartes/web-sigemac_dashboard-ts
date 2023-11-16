import { AxiosResponse } from 'axios'
import { NewsInterface } from '../../interfaces/news'
import {
  createNews,
  deleteNews,
  getNews,
  getAllNews,
  getAllNewsByTerm,
  updateNews
} from '../../modules/Api/Dao/News'
import { ApiResponseDataInterface } from '../../interfaces/IApiResponse'

export class NewsRepository {
  getAllNewsRepository = async (): Promise<
    AxiosResponse<ApiResponseDataInterface>
  > => {
    return getAllNews()
  }
  getAllNewsByTermRepository = async (
    term: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> => {
    return getAllNewsByTerm(term)
  }
  getNewsAccountRepository = async (email: string): Promise<NewsInterface> => {
    return getNews(email)
  }
  createNewsRepository = async (
    newsData: NewsInterface
  ): Promise<AxiosResponse<ApiResponseDataInterface>> => {
    return new Promise((resolve, reject) => {
      createNews(newsData)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  updateNewsRepository(
    documentId: string,
    dataToSave: NewsInterface
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      updateNews(documentId, dataToSave)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  deleteNewsAccountRepository = async (
    documentId: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> => {
    return new Promise((resolve, reject) => {
      deleteNews(documentId)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
