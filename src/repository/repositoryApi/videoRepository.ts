import { AxiosResponse } from 'axios'
import { VideoInterface } from '../../interfaces/video'
import {
  createVideo,
  deleteVideo,
  getVideo,
  getAllVideo,
  getAllVideoByTerm,
  updateVideo
} from '../../modules/Api/Dao/Video'
import { ApiResponseDataInterface } from '../../interfaces/IApiResponse'

export class VideoRepository {
  getAllVideoRepository = async (): Promise<
    AxiosResponse<ApiResponseDataInterface>
  > => {
    return getAllVideo()
  }
  getAllVideoByTermRepository = async (
    term: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> => {
    return getAllVideoByTerm(term)
  }
  getVideoAccountRepository = async (
    email: string
  ): Promise<VideoInterface> => {
    return getVideo(email)
  }
  createVideoRepository = async (
    videoData: VideoInterface
  ): Promise<AxiosResponse<ApiResponseDataInterface>> => {
    return new Promise((resolve, reject) => {
      createVideo(videoData)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  updateVideoRepository(
    documentId: string,
    dataToSave: VideoInterface
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      updateVideo(documentId, dataToSave)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  deleteVideoAccountRepository = async (
    documentId: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> => {
    return new Promise((resolve, reject) => {
      deleteVideo(documentId)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
