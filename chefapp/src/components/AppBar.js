import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import { connect } from 'react-redux'
import { openDrawerActionCreator } from '../state/drawer'
import { logOutActionCreator, deleteAccountActionCreator } from '../state/auth'
import { AppBar, Menu, MenuItem, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Menu';
import logo from '../img/logo.png'

const styles = {
  appBar: { boxShadow: 'none' },
  toolbar: { justifyContent: 'space-between' },
  typography: { margin: 'auto', width: 'calc(100% )', backgroundColor: 'white', textAlign: 'center', fontWeight: '500' },
  logo: { cursor: 'pointer' },
  link: { textDecoration: 'none', color: 'black' },
  button: { maxWidth: '25%' },
  dialog: { maxWidth: 500, margin: 'auto' }
}

const MenuAppBar = props => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [isDeleteAccountDialogOpen, setIsDeleteAccountDialogOpen] = React.useState(false)
  const open = Boolean(anchorEl)
  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="static" style={styles.appBar}>
      <Toolbar style={styles.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={props._drawerOpen}
        >
          <MenuIcon />
        </IconButton>
        <img
          onClick={() => props.history.push('/')}
          style={styles.logo}
          src={logo}
          alt='logo'
        />
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <SettingsIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <Dialog
              style={styles.dialog}
              open={isDeleteAccountDialogOpen}
              onClose={() => setIsDeleteAccountDialogOpen(false)}
            >
              <DialogTitle >{"Czy napewno chcesz usunąć swoje konto?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Zostaniesz wylogowany, a Twoje konto zostanie usunięte na zawsze. Nie można odwrócić tej operacji.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  style={styles.button}
                  onClick={() => {
                    props._deleteAccount(
                      props._logOut,
                      () => setIsDeleteAccountDialogOpen(false)
                    )
                  }}
                  color="error"
                  fullWidth
                >
                  Usuń
                </Button>
                <Button
                  style={styles.button}
                  onClick={() => setIsDeleteAccountDialogOpen(false)}
                  color="secondary"
                  autoFocus
                  fullWidth
                >
                  Anuluj
                </Button>
              </DialogActions>
            </Dialog>

            <Link to='/change-password' style={styles.link}>
              <MenuItem onClick={handleClose}>Zmień hasło</MenuItem>
            </Link>
            <Link to='/' style={styles.link}>
              <MenuItem onClick={() => setIsDeleteAccountDialogOpen(true)}>Usuń konto</MenuItem>
            </Link>
            <Link to='/' style={styles.link}>
              <MenuItem onClick={props._logOut}>Wyloguj się</MenuItem>
            </Link>
          </Menu>
        </div>
      </Toolbar>
    </AppBar >
  )
}

const mapDispatchToProps = (dispatch) => ({
  _drawerOpen: () => dispatch(openDrawerActionCreator()),
  _logOut: () => dispatch(logOutActionCreator()),
  _deleteAccount: (success, error) => dispatch(deleteAccountActionCreator(success, error)),
})

export default connect(
  null,
  mapDispatchToProps
)(withRouter(MenuAppBar))