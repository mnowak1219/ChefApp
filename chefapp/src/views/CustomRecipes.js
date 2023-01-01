import React from 'react'

import { connect } from 'react-redux'
import { getRecipesAsyncActionCreator, deleteRecipeAsyncActionCreator, editRecipeAsyncActionCreator } from '../state/recipes'

import { Typography } from '@mui/material'
import RecipesList from '../components/RecipesList'
import SingleRecipe from './SingleRecipe'
import MultiAutocompleteInput from '../components/MultiAutocompleteInput'
import { Button } from '@mui/material'

const styles = {
  refresh: { cursor: 'pointer', color: 'blue' },
  autocomplete: { maxWidth: 700, margin: '30px auto' },
  noRecipes: { cursor: 'pointer' },
}

class UserRecipes extends React.Component {
  state = {
    selectedItem: []
  }

  setSelectedItem = (items) => this.setState({ selectedItem: items })

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    this.props._getData()
  }

  render() {
    if (this.props._isFetching.length === 0) {

      const recipesToShow = this.props._recipes.filter(recipe => {
        const ingredients = recipe.ingredients.map(el => el.ingredient)
        return this.state.selectedItem.reduce((red, el) => ingredients.includes(el) ? red : false, true)
      })

      if (this.props._isError) {
        return (
          <div>
            <Typography
              variant='h4'
              align='center'
              color='error'
              style={{
                marginTop: '100px',
                marginBottom: '80px',
              }}
            >
              Nie udało się pobrać przepisów
            </Typography>
            <Typography
              style={styles.refresh}
              variant='h4'
              align='center'
              onClick={this.getData}
            >
              Odśwież
            </Typography>
          </div>
        )
      }
      if (this.props._recipes.length === 0) {
        return (
          <div>
            <Typography
              variant='h4'
              color='secondary'
              align='center'
              style={{
                marginTop: '100px',
                marginBottom: '80px',
              }}
            >
              Nie dodałeś/aś jeszcze żadnych przepisów.
            </Typography>
            <Typography
              style={styles.noRecipes}
              variant='h4'
              color='primary'
              align='center'
              onClick={() => this.props.history.push('/add-recipe')}
            >
              Dodaj przepis
            </Typography>
          </div>
        )
      }

      if (this.props.match.params.id) {
        const recipe = this.props._recipes.find(el => el.key === this.props.match.params.id)
        return <SingleRecipe
          data={recipe}
          param={this.props.match.params.id}
          back={() => this.props.history.push('/custom-recipes')}
          _deleteRecipe={this.props._deleteRecipe}
          _editRecipe={this.props._editRecipe}
        />
      }

      return (
        <div>
          <div style={styles.autocomplete}>
            <MultiAutocompleteInput
              label='Filtruj przepisy'
              placeholder='Zacznij pisać i wybierz z listy składniki'
              suggestions={this.props._suggestions}
              selectedItem={this.state.selectedItem}
              setSelectedItem={this.setSelectedItem}
            />
          </div>
          <RecipesList
            data={recipesToShow}
            route='/custom-recipes'
            changeRoute={this.props.history.push}
          />
          {recipesToShow.length === 0 &&
            <Typography
              color='secondary'
              align='center'
              variant='h4'
            >
              Nie ma przepisu zawierającego te składniki
            </Typography>
          }
          <div style={styles.autocomplete}>
            <Button
              size='large'
              color='primary'
              variant='contained'
              fullWidth={true}
              onClick={() => this.props.history.push('/add-recipe')}
            >
              Dodaj nowy przepis
            </Button>
          </div>
        </div>
      )
    }
    return null
  }
}

const mapStateToProps = state => ({
  _isError: state.recipes.isError,
  _recipes: state.recipes.recipes,
  _suggestions: state.recipes.suggestions,
  _isFetching: state.circularProgress.circulars
})

const mapDispatchToProps = dispatch => ({
  _getData: () => dispatch(getRecipesAsyncActionCreator()),
  _deleteRecipe: (key, success, error) => dispatch(deleteRecipeAsyncActionCreator(key, success, error)),
  _editRecipe: (form, key, success, error) => dispatch(editRecipeAsyncActionCreator(form, key, success, error))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserRecipes)