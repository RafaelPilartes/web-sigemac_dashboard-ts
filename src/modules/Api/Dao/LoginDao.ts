import axios, { AxiosResponse } from 'axios'
import { ApiJasei } from '../api.jasei'
import { ApiResponseDataInterface } from '../../../interfaces/IApiResponse'

const route = 'admin'

export default interface LoginDao {
  signInWithEmail(
    email: string,
    password: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>>
}

export async function loginWithEmailAndPassword(
  email: string,
  password: string
): Promise<AxiosResponse<ApiResponseDataInterface>> {
  return new Promise(async (resolve, reject) => {
    const userData = {
      email,
      password
    }
    const url = `http://localhost:8000/admin/login`
    axios
      .post(url, userData)
      .then(resData => {
        resolve(resData as any)
      })
      .catch(error => {
        reject(error)
      })
  })
}
