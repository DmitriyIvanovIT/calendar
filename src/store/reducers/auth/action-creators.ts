import {AuthActionsEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from "./types";
import {AppDispatch} from "store";
import { IUser } from "types/global";
import UserService from "api/UserService";

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({ type: AuthActionsEnum.SET_USER, payload: user }),
  setIsAuth: (isAuth: boolean): SetAuthAction => ({ type: AuthActionsEnum.SET_AUTH, payload: isAuth }),
  setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type: AuthActionsEnum.SET_IS_LOADING, payload }),
  setError: (payload: string): SetErrorAction => ({ type: AuthActionsEnum.SET_ERROR, payload }),
  login: (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true));
      setTimeout(async () => {
        const response = await UserService.getUsers();
        const mockUsers = response.data.find((user: IUser) => user.username === username && user.password === password);
        if (mockUsers) {
          localStorage.setItem('auth', 'true');
          localStorage.setItem('username', mockUsers.username);
          dispatch(AuthActionCreators.setUser(mockUsers));
          dispatch(AuthActionCreators.setIsAuth(true));
        } else {
          dispatch(AuthActionCreators.setError('Неправильный логин и пароль'));
        }
        dispatch(AuthActionCreators.setIsLoading(false));
      }, 1000)
    } catch (err) {
      dispatch(AuthActionCreators.setError('Произошла ошибка'));
    }
  },
  logout: () => async (dispatch: AppDispatch) => {
      localStorage.removeItem('auth');
      localStorage.removeItem('username');
      dispatch(AuthActionCreators.setUser({} as IUser));
      dispatch(AuthActionCreators.setIsAuth(false));
  }
}