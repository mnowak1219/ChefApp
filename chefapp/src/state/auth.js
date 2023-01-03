import axios from 'axios'
import { SIGN_UP_URL, SIGN_IN_URL, RESET_PASSWORD_URL, REFRESH_TOKEN_URL, CHANGE_PASSWORD_URL, DELETE_ACCOUNT_URL } from '../consts/firebase'
import { circularProgress } from './circularProgress'
import { addSnackbar } from './snackbars'

const SAVE_USER = 'auth/SAVE_USER'
const LOG_OUT = 'auth/LOG_OUT'
const getSnackbarText = (string) => {
  switch (string) {
    case 'EMAIL_EXISTS':
      return 'Do tego maila jest już przypisany użytkownik'
    case 'OPERATION_NOT_ALLOWED':
      return 'To hasło jest niedozwolone'
    case 'EMAIL_NOT_FOUND':
      return 'Złe hasło lub email'
    case 'INVALID_PASSWORD':
      return 'Złe hasło lub email'
    case 'USER_DISABLED':
      return 'To konto jest zablokowane'
    default:
      return 'Coś poszło nie tak! Spróbuj ponownie później'
  }
}

export const authRequest = (url, method = 'get', data = {}) => (dispatch, getState) => {
  const getUrlWithToken = () => {
    const idToken = getState().auth.idToken
    if (idToken) {
      return url.includes('?') ? url + '&auth=' + idToken : url + '?auth=' + idToken
    }
    return url
  }

  return axios({
    url: getUrlWithToken(),
    method,
    data
  })
    .catch(error => {
      const refreshToken = localStorage.getItem('refreshToken')
      if (refreshToken && error.response.statusText === 'Unauthorized')
        return dispatch(useRefreshTokenAsyncActionCreator(refreshToken))
          .then(() => {
            return axios({
              url: getUrlWithToken(),
              method,
              data
            })
          })
          .catch((error) => {
            dispatch(logOutActionCreator())
            dispatch(addSnackbar('Twoja sesja wygasła zaloguj się ponownie!', 'red'))
            return Promise.reject(error)
          })
      else {
        return Promise.reject(error)
      }
    })
}

export const registerAsyncActionCreator = (email, password) => (dispatch, getState) => {
  dispatch(circularProgress.add())
  axios.post(SIGN_UP_URL, {
    email,
    password
  })
    .then(response => {
      const { idToken, refreshToken, localId } = response.data
      dispatch(saveUserActionCreator(idToken, refreshToken, localId))
    })
    .catch(error => {
      const text = getSnackbarText(
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.message
      )
      dispatch(addSnackbar(text, 'red'))
    })
    .finally(() => dispatch(circularProgress.remove()))
}

export const logInAsyncActionCreator = (email, password) => (dispatch, getState) => {
  dispatch(circularProgress.add())
  axios.post(SIGN_IN_URL, {
    email,
    password,
    returnSecureToken: true
  })
    .then(response => {
      const { idToken, refreshToken, localId } = response.data
      dispatch(saveUserActionCreator(idToken, refreshToken, localId))
    })
    .catch(error => {
      const text = getSnackbarText(
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.message
      )
      dispatch(addSnackbar(text, 'red'))
    })
    .finally(() => dispatch(circularProgress.remove()))
}

export const changePasswordActionCreator = (password, success) => (dispatch, getState) => {
  dispatch(circularProgress.add())
  const idToken = getState().auth.idToken
  axios.post(CHANGE_PASSWORD_URL, {
    idToken,
    password,
    returnSecureToken: true
  })
    .then(() => {
      localStorage.removeItem('refreshToken');
      dispatch(addSnackbar('Hasło zostało zmienione. Zaloguj się ponownie', 'green'))
      success()
    })
    .catch(() => {
      dispatch(addSnackbar('Nie udało się zmienić hasła. Przeloguj się i spróbuj ponownie', 'red'))
    })
    .finally(() => dispatch(circularProgress.remove()))
}

export const resetPasswordAsyncActionCreator = (email, success) => (dispatch, getState) => {
  dispatch(circularProgress.add())
  axios.post(RESET_PASSWORD_URL, {
    email,
    requestType: 'PASSWORD_RESET'
  })
    .then(() => {
      dispatch(addSnackbar('Sprawdź swojego maila!'))
      success()
    })
    .catch(() => {
      dispatch(addSnackbar('Użytkownik z tym emailem nie istnieje', 'red'))
    })
    .finally(() => dispatch(circularProgress.remove()))
}

export const logOutActionCreator = () => {
  localStorage.removeItem('refreshToken')
  return {
    type: LOG_OUT
  }
}

export const deleteAccountActionCreator = (success, error) => (dispatch, getState) => {
  dispatch(circularProgress.add())
  const idToken = getState().auth.idToken
  axios.post(DELETE_ACCOUNT_URL, {
    idToken
  })
    .then(() => {
      //  localStorage.removeItem('refreshToken')
      dispatch(addSnackbar('Konto zostało bezpowrotnie usunięte'))
      success()
    })
    .catch(() => {
      dispatch(addSnackbar('Nie można usunąć konta. Spróbuj ponownie później', 'red'))
      error()
    })
    .finally(() => dispatch(circularProgress.remove()))
}

const saveUserActionCreator = (idToken, refreshToken, userId) => {
  localStorage.setItem('refreshToken', refreshToken)
  return {
    type: SAVE_USER,
    idToken,
    userId
  }
}

export const autoLogInAsyncActionCreator = () => (dispatch, getState) => {
  const refreshToken = localStorage.getItem('refreshToken')

  if (refreshToken) {
    dispatch(useRefreshTokenAsyncActionCreator(refreshToken))
  }
}

const useRefreshTokenAsyncActionCreator = refreshToken => (dispatch, getState) => {
  dispatch(circularProgress.add())
  return axios.post(REFRESH_TOKEN_URL, {
    grant_type: 'refresh_token',
    refresh_token: refreshToken
  })
    .then(response => {
      const { id_token, refresh_token, user_id } = response.data
      dispatch(saveUserActionCreator(id_token, refresh_token, user_id))
      return response
    })
    .finally(() => dispatch(circularProgress.remove()))
}

const initialState = {
  isLogged: false,
  idToken: null,
  userId: null
}

const authState = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        isLogged: true,
        idToken: action.idToken,
        userId: action.userId
      }
    case LOG_OUT:
      return {
        ...state,
        isLogged: false,
        idToken: null,
        userId: null
      }
    default:
      return state
  }
}
export default authState