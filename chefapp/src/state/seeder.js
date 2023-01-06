import { URL } from '../consts/firebase'
import { circularProgress } from './circularProgress'
import { addSnackbar } from './snackbars'
import mapObjectToArray from '../utilities/mapObjectToArray'
import axios from 'axios'

const ADD_RECIPES = 'recipes/ADD_RECIPES'
const ERROR_ON_GET = 'recipes/ERROR_ON_GET'

export const seedRecipeAsyncActionCreator = (form) => (dispatch, getState) => {
  dispatch(circularProgress.add())
  return axios.post(URL + 'baseRecipes.json', form, { headers: null },)
    .then(() => {
      dispatch(circularProgress.remove())
    })
    .catch(() => {
      dispatch(circularProgress.remove())
      dispatch(addSnackbar('Wystąpił błąd przy ładowaniu przepisów bazowych. Spróbuj ponownie później', 'red'))
      return Promise.reject()
    })
}

export const getRecipesAsyncActionCreator = () => (dispatch, getState) => {
  dispatch(circularProgress.add())
  return axios.get(URL + 'baseRecipes.json')
    .then((response) => {
      const mappedData = mapObjectToArray(response.data)
      dispatch(seedRecipesActionCreator(mappedData))
      dispatch(circularProgress.remove())
    })
    .catch(() => {
      dispatch(circularProgress.remove())
      dispatch(errorOnGetRecipesActionCreator())
    })
}

const seedRecipesActionCreator = recipes => {
  const suggestions = recipes
    .reduce((red, el) => [...red, ...el.ingredients], [])
    .reduce((red, el) => [...red, ...el.map(({ ingredient }) => ingredient)], [])
  return {
    type: ADD_RECIPES,
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
    case ADD_RECIPES:
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