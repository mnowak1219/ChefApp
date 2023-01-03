import React from 'react'
import { Paper, TextField, Button, Typography } from '@mui/material'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux'
import { changePasswordActionCreator, logOutActionCreator } from '../state/auth'

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' },
    paper: { maxWidth: 320, padding: 20 },
    title: { marginBottom: 25},
    subtitle: { marginBottom: 5},
    buttonDiv: { display: 'flex', justifyContent: 'space-around', marginTop: 20, flexWrap: 'wrap' },
    button: { maxWidth: '45%', },
}


const ChangePassword = props => {
    const history = useHistory();
    const [newPwd, setNewPwd] = React.useState('')
    const [newPwdError, setNewPwdError] = React.useState(false)
    const newPwdValidate = (value) => {
        const isError = (value.length < 8)
        setNewPwdError(isError)
        return isError
    }

    const [newPwd2, setNewPwd2] = React.useState('')
    const [newPwd2Error, setNewPwd2Error] = React.useState(false)
    const newPwd2Validate = (value) => {
        const isError = (newPwd !== value)
        setNewPwd2Error(isError)
        return isError
    }

    const onSubmit = () => {

        const isNewPwdError = newPwdValidate(newPwd)
        const isNewPwd2Error = newPwd2Validate(newPwd2)
        if (!isNewPwdError && !isNewPwd2Error) {
            props._changePassword(newPwd, () => {
                props.history.push('/')
                props._logOut()
            })

        }
    }


    const submitOnEnter = evt => {
        if (evt.key === 'Enter')
            onSubmit()
    }

    return (
        <div style={styles.container}>
            <Paper style={styles.paper}>
                <Typography
                    style={styles.title}
                    align='center'
                    variant='h4'
                    color='secondary'
                >
                    Zmień hasło
                </Typography>
                <Typography
                    style={styles.subtitle}
                    align='center'
                    variant='subtitle1'
                    color='secondary'
                >
                    Po zmianie hasła zostaniesz wylogowany. Jeśli będziesz chciał nadal korzystać z aplikacji będziesz musiał się zalogować wykorzystując nowe hasło.
                </Typography>
                <TextField
                    value={newPwd}
                    onKeyPress={submitOnEnter}
                    onChange={evt => {
                        setNewPwd(evt.target.value)
                        if (newPwdError) {
                            newPwdValidate(evt.target.value)
                            if (newPwd2Error) {
                                setNewPwd2Error(evt.target.value !== newPwd2)
                            }
                        }
                    }}
                    label='nowe hasło'
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    type='password'
                    error={newPwdError}
                    helperText={newPwdError ? 'Hasło musi zawierać co najmniej 8 znaków!' : null}
                    onBlur={() => {
                        newPwdValidate(newPwd)
                        if (newPwd2Error) {
                            newPwd2Validate(newPwd2)
                        }
                    }}
                />
                <TextField
                    value={newPwd2}
                    onKeyPress={submitOnEnter}
                    onChange={evt => {
                        setNewPwd2(evt.target.value)
                        if (newPwd2Error) {
                            newPwd2Validate(evt.target.value)
                        }
                    }}
                    label='powtórz nowe hasło'
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    type='password'
                    error={newPwd2Error}
                    helperText={newPwd2Error ? 'Hasła muszą być takie same!' : null}
                    onBlur={() => newPwd2Validate(newPwd2)}
                />
                <div style={styles.buttonDiv}>
                    <Button
                        style={styles.button}
                        color='primary'
                        variant='contained'
                        onClick={() => {
                            onSubmit()
                        }}
                        margin='normal'
                        fullWidth
                    >
                        Zmień hasło
                    </Button>
                    <Button
                        style={styles.button}
                        color='secondary'
                        variant='contained'
                        onClick={() => history.goBack()}
                        fullWidth
                    >
                        powrót
                    </Button>
                </div>
            </Paper>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    _changePassword: (password, success) => dispatch(changePasswordActionCreator(password, success)),
    _logOut: () => dispatch(logOutActionCreator()),
})

export default connect(
    null,
    mapDispatchToProps
)(ChangePassword)