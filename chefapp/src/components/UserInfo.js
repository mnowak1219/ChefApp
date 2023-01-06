import React from 'react'
import { withRouter } from 'react-router-dom'
import { Paper, Typography } from '@mui/material'
import { connect } from 'react-redux'
import { getUserEmailActionCreator } from '../state/auth'

const styles = {
  paper: { boxShadow: 'none', backgroundColor: 'rgba(0, 0, 0, 0.05)', borderRadius: 0 },
  typography: { margin: 'auto', width: '100%', textAlign: 'center', fontWeight: '500' },
}

const UserInfo = props => {
  props._getUserEmail()
  return (
    <Paper
      style={styles.paper}>
      <Typography
        style={styles.typography}
        color='primary'>
        Zalogowany użytkownik: {props.userEmail}
      </Typography>
    </Paper>

  )
}
const mapStateToProps = state => ({
  userEmail: state.auth.userEmail
})

const mapDispatchToProps = (dispatch) => ({
  _getUserEmail: () => dispatch(getUserEmailActionCreator())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserInfo))