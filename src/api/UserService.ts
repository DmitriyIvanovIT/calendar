import axios, {AxiosResponse} from "axios";
import {IUser} from "types/global";

export default class UserService {
  static async getUsers(): Promise<AxiosResponse<IUser[]>> {
    return axios.get<IUser[]>('./users.json');
  }
}