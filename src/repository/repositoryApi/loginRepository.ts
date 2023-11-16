import LoginDao, {
  loginWithEmailAndPassword
} from '../../modules/Api/Dao/LoginDao'
import { AxiosResponse } from 'axios'
import { ApiResponseDataInterface } from '../../interfaces/IApiResponse'

export class LoginRepository implements LoginDao {
  signInWithEmail(
    email: string,
    password: string
  ): Promise<AxiosResponse<ApiResponseDataInterface>> {
    return new Promise((resolve, reject) => {
      loginWithEmailAndPassword(email, password)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
