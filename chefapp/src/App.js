import React from 'react'
import AppBar from './components/AppBar'
import BackToTop from './components/BackToTop'
import CircularProgress from './components/CircularProgress'
import Snackbars from './components/Snackbars'
import Drawer from './components/Drawer'
import { Route } from 'react-router-dom';
import AddRecipe from './views/AddRecipe'
import Dashboard from './views/Dashboard'
import BaseRecipes from './views/BaseRecipes'
import CustomRecipes from './views/CustomRecipes'
import ChangePassword from './views/ChangePassword'
import Auth from './Auth'

export const App = props => {
    return (
        <div className='container'>
            <Auth>
                <AppBar />
                <Drawer />
                <Route path='/' exact component={Dashboard} />
                <Route path='/add-recipe' component={AddRecipe} />
                <Route path='/base-recipes' component={BaseRecipes} />
                <Route path='/custom-recipes/:id?' component={CustomRecipes} />
                <Route path='/change-password' component={ChangePassword} />
            </Auth>
            <CircularProgress />
            <Snackbars />
            <BackToTop />
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />a<br />
        </div>
    )
}