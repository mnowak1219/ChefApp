import React from 'react'
import { connect } from 'react-redux'
import { getRecipesAsyncActionCreator, seedRecipeAsyncActionCreator } from '../state/seeder'
import { Typography } from '@mui/material'
import RecipesList from '../components/RecipesList'
import SingleRecipe from './SingleRecipe'
import MultiAutocompleteInput from '../components/MultiAutocompleteInput'
import baseRecipes from '../consts/baseRecipes'

const styles = {
    refresh: { cursor: 'pointer', color: 'blue' },
    autocomplete: { maxWidth: 700, margin: '30px auto' },
    noRecipes: { cursor: 'pointer' },
}

class BaseRecipes extends React.Component {
    state = {
        selectedItem: []
    }

    setSelectedItem = (items) => this.setState({ selectedItem: items })

    componentDidMount() {

        if (baseRecipes.length > 0 && false) {
            for (let i = 0; i < baseRecipes.length; i++) {
                this.seedData(baseRecipes[i])
            }
        }

        this.getData()
    }

    seedData = (baseRecipe) => {
        this.props._seedData(baseRecipe)
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
            
            if (this.props._isError || this.props._recipes.length === 0) {
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

            if (this.props.match.params.id) {
                const recipe = this.props._recipes.find(el => el.key === this.props.match.params.id)
                return <SingleRecipe
                    data={recipe}
                    param={this.props.match.params.id}
                    back={() => this.props.history.push('/base-recipes')}
                />
            }

            return (
                <div>
                    <div style={styles.autocomplete}>
                        <MultiAutocompleteInput
                            label='Filtruj przepisy'
                            placeholder='Zacznij pisać i wybierz składnik z listy'
                            suggestions={this.props._suggestions}
                            selectedItem={this.state.selectedItem}
                            setSelectedItem={this.setSelectedItem}
                        />
                    </div>
                    <RecipesList
                        data={recipesToShow}
                        route='/base-recipes'
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
                </div>
            )
        }
        return null
    }
}

const mapStateToProps = state => ({
    _isError: state.seeder.isError,
    _recipes: state.seeder.recipes,
    _suggestions: state.seeder.suggestions,
    _isFetching: state.circularProgress.circulars
})

const mapDispatchToProps = dispatch => ({
    _getData: () => dispatch(getRecipesAsyncActionCreator()),
    _seedData: (form) => dispatch(seedRecipeAsyncActionCreator(form))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BaseRecipes)