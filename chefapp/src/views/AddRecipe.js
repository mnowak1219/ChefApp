import React from 'react'
import { connect } from 'react-redux'
import { addRecipeAsyncActionCreator } from '../state/recipes'
import { TextField, InputAdornment, Typography, Button } from '@mui/material'
import Ingredients from '../components/Ingredients'

const MAX_NAME_LENGTH = 100
const MIN_NAME_LENGTH = 3
const MIN_DESCRIPTION_LENGTH = 10
const MAX_DESCRIPTION_LENGTH = 2500
const MAX_TIME = 1440

const styles = {
    div: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
    input: { maxWidth: 580, margin: '10px 0' },
    title: { fontWeight: 'bold', margin: 30 },
    link: { fontSize: '1.5rem', fontWeight: 'bold', cursor: 'pointer' },
}

const AddRecipe = props => {
    const formInStorage = JSON.parse(localStorage.getItem('form')) || {}

    React.useEffect(() => {
        const form = {
            name,
            description,
            ingredients,
            time,
            photo
        }
        localStorage.setItem('form', JSON.stringify(form))
    })

    const [name, setName] = React.useState(formInStorage.name || '')
    const [nameError, setNameError] = React.useState(false)
    const nameValidate = (value) => {
        const validValue = value && value.replace(/\s{2,}/g, ' ')
        if (value !== validValue) {
            setName(validValue)
        }
        const isError = !validValue || validValue.length < MIN_NAME_LENGTH
        setNameError(isError)
        return isError
    }
    const setValidName = (string) => {
        if (string.length <= MAX_NAME_LENGTH) {
            setName(string)
        }
    }

    const [description, setDescription] = React.useState(formInStorage.description || '')
    const [descriptionError, setDescriptionError] = React.useState(false)
    const descriptionValidate = (value) => {
        const validValue = value && value.replace(/\s{2,}/g, ' ')
        if (value !== validValue) {
            setDescription(validValue)
        }
        const isError = !validValue || validValue.length < MIN_DESCRIPTION_LENGTH
        setDescriptionError(isError)
        return isError
    }
    const setValidDescription = (string) => {
        if (string.length < MAX_DESCRIPTION_LENGTH) {
            setDescription(string)
        }
    }

    const [time, setTime] = React.useState(formInStorage.time || '')
    const [timeError, setTimeError] = React.useState(false)
    const timeValidate = (value) => {
        value = Number(Number(value).toFixed(2))
        setTime(value)
        const isError = value < 1
        setTimeError(isError)
        return isError
    }
    const setValidTime = (value) => {
        setTime(value < 0 ? 0 : value > MAX_TIME ? MAX_TIME : value)
    }

    const [photo, setPhoto] = React.useState(formInStorage.photo || '')
    const [photoError, setPhotoError] = React.useState(false)
    const photoValidate = (value) => {
        const isError = value.length > 0 && !value.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/)
        setPhotoError(isError)
        return isError
    }

    const [ingredients, setIngredients] = React.useState(formInStorage.ingredients || [])
    const [ingredientsError, setIngredientsError] = React.useState(false)
    const ingredientsValidate = (value) => {
        const isError = value.length === 0
        setIngredientsError(isError)
        return isError
    }

    const onSubmit = () => {
        const isNameError = nameValidate(name)
        const isDescriptionError = descriptionValidate(description)
        const isIngredientsError = ingredientsValidate(ingredients)
        const isTimeError = timeValidate(time)
        const isPhotoError = photoValidate(photo)

        if (!isNameError && !isDescriptionError && !isIngredientsError && !isTimeError && !isPhotoError) {
            const form = {
                name,
                description,
                ingredients,
                time,
                photo
            }
            props._addRecipe(form)
                .then(() => {
                    setName('')
                    setDescription('')
                    setIngredients([])
                    setTime('')
                    setPhoto('')
                })
                .then(() => {
                    props.history.push('/custom-recipes')
                })
                .catch(() => { })
        }
    }

    const clearForm = () => {
        setName('')
        setDescription('')
        setIngredients([])
        setTime('')
        setPhoto('')
    }

    const inputs = [
        {
            label: 'Nazwa',
            value: name,
            onChange: setValidName,
            error: nameError,
            validate: nameValidate,
            helperText: 'Zbyt krótka nazwa, minimum 3 znaki'
        },
        {
            label: 'Składniki'
        },
        {
            label: 'Sposób przyrządzenia',
            value: description,
            onChange: setValidDescription,
            error: descriptionError,
            validate: descriptionValidate,
            helperText: 'Zbyt krótka nazwa, minimum 10 znaków',
            multiline: true
        },
        {
            label: 'Czas przyrządzenia',
            value: time,
            onChange: setValidTime,
            error: timeError,
            validate: timeValidate,
            helperText: 'Podaj czas przyrządzenia dania w pełnych minutach',
            type: 'number',
            InputProps: {
                endAdornment: <InputAdornment position="end">min</InputAdornment>,
            }
        },
        {
            label: 'Zdjęcie (opcjonalne)',
            value: photo,
            onChange: setPhoto,
            error: photoError,
            validate: photoValidate,
            helperText: 'Podaj prawidłowy adres URL',
            placeholder: 'http://'
        },
    ]
    return (
        <div style={styles.div}>
            <Typography
                style={styles.title}
                align='center'
                variant='h5'
                color='secondary'
            >
                Dodaj przepis.
                <br />
                Przepis zostanie dodany do{' '}
                <Typography
                    style={styles.link}
                    display='inline'
                    color='primary'
                    onClick={() => props.history.push('/custom-recipes')}
                >
                    Twojej listy.
                </Typography>
            </Typography>
            {inputs.map((input) => input.label === 'Składniki' ?
                <Ingredients
                    key={input.label}
                    ingredients={ingredients}
                    setIngredients={setIngredients}
                    ingredientsError={ingredientsError}
                    setIngredientsError={setIngredientsError}
                />
                :
                <TextField
                    key={input.label}
                    style={styles.input}
                    variant='outlined'
                    fullWidth
                    label={input.label}
                    value={input.value}
                    error={input.error}
                    helperText={input.error && input.helperText}
                    onChange={(evt) => {
                        input.onChange(evt.target.value)
                        if (input.error) {
                            input.validate(evt.target.value)
                        }
                    }}
                    onBlur={() => input.validate(input.value)}
                    multiline={input.multiline}
                    type={input.type || 'text'}
                    InputProps={input.InputProps}
                    placeholder={input.placeholder}
                />
            )}
            <div style={{ width: 580, marginTop: 25, display: 'flex', justifyContent: 'space-between' }}>
                <Button
                    style={{ margin: 10, maxWidth: '40%' }}
                    size='large'
                    color='secondary'
                    variant='contained'
                    fullWidth
                    onClick={clearForm}
                >
                    Wyczyść formularz
                </Button>
                <Button
                    style={{ margin: 10, maxWidth: '40%' }}
                    size='large'
                    color='primary'
                    variant='contained'
                    fullWidth
                    onClick={onSubmit}
                >
                    Dodaj przepis
                </Button>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    _addRecipe: (form) => dispatch(addRecipeAsyncActionCreator(form))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddRecipe)