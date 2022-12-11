import React from 'react'
import AppBar from './components/AppBar'
import BackToTop from './components/BackToTop'
import FullScreenCircularProgress from './components/FullScreenCircularProgress'
import Snackbars from './components/Snackbars'
import Drawer from './components/Drawer'
import { Route } from 'react-router-dom';
import AddRecipe from './views/AddRecipe'
import Dashboard from './views/Dashboard'
import BaseRecipes from './views/BaseRecipes'
import CustomRecipes from './views/CustomRecipes'
import ChangePassword from './views/ChangePassword'

export const App = props => {
    return (
        <div className='container'>
            <FullScreenCircularProgress />
            <AppBar />
            <Drawer />
            <Route path='/' exact component={Dashboard} />
            <Route path='/add-recipe' component={AddRecipe} />
            <Route path='/base-recipes' component={BaseRecipes} />
            <Route path='/custom-recipes' component={CustomRecipes} />
            <Route path='/change-password' component={ChangePassword} />
            <Snackbars />
            <BackToTop />
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />a<br />
        </div>
    )
}