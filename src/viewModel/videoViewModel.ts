import { AxiosResponse } from 'axios'
import { VideoInterface } from '../interfaces/video'
import { VideoRepository } from '../repository/repositoryApi/videoRepository'
import { ApiResponseDataInterface } from '../interfaces/IApiResponse'

export class VideoViewModel {
  private repositoryVideo: VideoRepository

  constructor() {
    this.repositoryVideo = new VideoRepository()
  }

  getAllVideoData(): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryVideo
        .getAllVideoRepository()
        .then(result => {
          resolve(result as any)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  getAllVideoByTermData(
    term: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryVideo
        .getAllVideoByTermRepository(term)
        .then(result => {
          resolve(result as any)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  getVideoData(email: string): Promise<VideoInterface> {
    return new Promise((resolve, reject) => {
      this.repositoryVideo
        .getVideoAccountRepository(email)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  createVideo(
    dataToSave: VideoInterface
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryVideo
        .createVideoRepository(dataToSave)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  updateVideoData(
    documentId: string,
    dataToSave: VideoInterface
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryVideo
        .updateVideoRepository(documentId, dataToSave)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  deleteVideoData(
    documentId: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      this.repositoryVideo
        .deleteVideoAccountRepository(documentId)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
