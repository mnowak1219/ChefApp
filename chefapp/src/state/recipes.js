import { URL } from '../consts/firebase'
import { circularProgress } from './circularProgress'
import { addSnackbar } from './snackbars'
import mapObjectToArray from '../utilities/mapObjectToArray'
import { authRequest } from './auth'

const SAVE_RECIPES = 'recipes/SAVE_RECIPE'
const ERROR_ON_GET = 'recipes/ERROR_ON_GET'

export const addRecipeAsyncActionCreator = form => (dispatch, getState) => {
  const userId = getState().auth.userId
  dispatch(circularProgress.add())
  return dispatch(authRequest(URL + 'users/' + userId + '/recipes.json', 'post', form))
    .then(() => {
      dispatch(circularProgress.remove())
      dispatch(addSnackbar('Dodano przepis do aplikacji', 'mainGreen'))
    })
    .catch(() => {
      dispatch(circularProgress.remove())
      dispatch(addSnackbar('Dodawanie przepisu nie powiodło się. Spróbuj ponownie później', 'red'))
      return Promise.reject()
    })
}

export const getRecipesAsyncActionCreator = () => (dispatch, getState) => {
  const userId = getState().auth.userId
  dispatch(circularProgress.add())
  dispatch(authRequest(URL + 'users/' + userId + '/recipes.json'))
    .then((response) => {
      const mappedData = mapObjectToArray(response.data)
      dispatch(saveRecipesActionCreator(mappedData))
      dispatch(circularProgress.remove())
    })
    .catch(() => {
      dispatch(circularProgress.remove())
      dispatch(errorOnGetRecipesActionCreator())
    })
}

export const deleteRecipeAsyncActionCreator = (key, success, error) => (dispatch, getState) => {
  const userId = getState().auth.userId
  dispatch(circularProgress.add())
  dispatch(authRequest(URL + 'users/' + userId + '/recipes/' + key + '.json', 'delete'))
    .then(() => {
      const recipes = getState().recipes.recipes
      const recipesAfterDelete = recipes.filter(recipe => recipe.key !== key)
      dispatch(saveRecipesActionCreator(recipesAfterDelete))
      dispatch(addSnackbar('Przepis usunięto prawidłowo'))
      dispatch(circularProgress.remove())
      success()
    })
    .catch(() => {
      dispatch(addSnackbar('Usuwanie nie powiodło się. Spróbuj ponownie później', 'red'))
      dispatch(circularProgress.remove())
      error()
    })
}

export const editRecipeAsyncActionCreator = (form, key, success, error) => (dispatch, getState) => {
  const userId = getState().auth.userId
  dispatch(circularProgress.add())
  dispatch(authRequest(URL + 'users/' + userId + '/recipes/' + key + '.json', 'patch', form))
    .then(() => {
      const recipes = getState().recipes.recipes
      const recipesAfterEdite = recipes.map(recipe => {
        if (recipe.key === key) {
          return form
        }
        return recipe
      })
      dispatch(saveRecipesActionCreator(recipesAfterEdite))
      dispatch(addSnackbar('Przepis edytowano prawidłowo'))
      dispatch(circularProgress.remove())
      success()
    })
    .catch(() => {
      dispatch(addSnackbar('Edytowanie nie powiodło się. Spróbuj ponownie później', 'red'))
      dispatch(circularProgress.remove())
      error()
    })
}

const saveRecipesActionCreator = recipes => {
  const suggestions = recipes
    .reduce((red, el) => [...red, ...el.ingredients], [])
    .reduce((red, el) => red.includes(el.ingredient) ? red : [...red, el.ingredient], [])
  return {
    type: SAVE_RECIPES,
    recipes,
    suggestions
  }
}

const errorOnGetRecipesActionCreator = () => ({ type: ERROR_ON_GET })

const initialState = {
  recipes: [],
  suggestions: [],
  isError: false,
}

const recipeState = (state = initialState, action) => {
    switch (action.type) {
      case SAVE_RECIPES:
        return {
          ...state,
          isError: false,
          recipes: action.recipes,
          suggestions: action.suggestions,
        }
      case ERROR_ON_GET:
        return {
          ...state,
          isError: true
        }
      default:
        return state
    }
  }
export default recipeState