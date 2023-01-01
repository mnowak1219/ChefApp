import React, { useState } from 'react'
import { TextField, Fab, Paper, Typography, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const MAX_INGREDIENT_NAME_LENGTH = 3
const MAX_INGREDIENT_LENGTH = 50
const MAX_QUANTITY_LENGTH = 50

const styles = {
    container: { maxWidth: 580 },
    inputsDiv: { display: 'flex', justifyContent: 'center' },
    input: { margin: '10px 20px 10px 0', maxWidth: 200 },
    addButton: { marginTop: 18 },
    paper: { maxWidth: 580, padding: 10, marginTop: 10, marginBottom: 10 },
    singleIngredient: { display: 'flex' },
    singleIngredientTypography: { flexGrow: 1 },
    singleIngredientRemoveButton: { width: 30, height: 30, alignSelf: 'center', paddingBottom: 10 },
    title: { maxWidth: 400, marginBottom: 15, borderStyle: 'none none double none', borderWith: '5px', borderColor: ' rgb(240,240,240)' },
    ingredientsList: { listStylePosition: 'outside', paddingLeft: 15 },
    ingredientsListItem: { marginLeft: 10, marginBottom: 5, marginTop: 5, paddingBottom: 10, inlineSize: 405, overflowWrap: 'break-word', borderBottom: 'solid 1px', borderColor: ' rgb(230,230,230)' },
}

const Ingredients = props => {
    const [ingredient, setIngredient] = useState('')
    const [ingredientError, setIngredientError] = useState(false)
    const ingredientValidate = (value) => {
        const validValue = value && value.replace(/\s{2,}/g, ' ')
        if (value !== validValue) {
            setIngredient(validValue)
        }
        const isError = !validValue || ((validValue.length < MAX_INGREDIENT_NAME_LENGTH) && (props.ingredients.length >= 0 && props.ingredients.length < 3))
        setIngredientError(isError)
        return isError
    }
    const setValidIngredient = (string) => {
        if (string.length <= MAX_INGREDIENT_LENGTH) {
            setIngredient(string)
        }
    }
    const focusTo = React.useRef(null)
    const [quantity, setQuantity] = useState('')
    const [quantityError, setQuantityError] = useState(false)
    const quantityValidate = value => {
        const validValue = value && value.replace(/\s{2,}/g, ' ')
        if (value !== validValue) {
            setQuantity(validValue)
        }
        const isError = !validValue
        setQuantityError(isError)
        return isError
    }
    const setValidQuantity = string => {
        if (string.length <= MAX_QUANTITY_LENGTH) {
            setQuantity(string)
        }
    }

    const onSubmit = () => {
        const isIngredientError = ingredientValidate(ingredient)
        const isQuantityError = quantityValidate(quantity)

        if (!isIngredientError && !isQuantityError) {
            props.setIngredients([
                ...props.ingredients,
                {
                    ingredient: ingredient.toLowerCase(),
                    quantity
                }
            ])
            setIngredient('')
            setQuantity('')
            props.setIngredientsError(false)
            focusTo.current.focus()
        }
    }

    const submitOnEnter = evt => {
        if (evt.key === 'Enter') {
            onSubmit()
        }
    }

    const removeIngredient = index => {
        props.setIngredients(props.ingredients.filter((el, i) => index !== i))
    }

    const inputs = [
        {
            label: 'Składnik',
            value: ingredient,
            onChange: setValidIngredient,
            error: ingredientError || props.ingredientsError,
            validate: ingredientValidate,
            helperText: 'Minimum 3 znaki',
            inputRef: focusTo
        },
        {
            label: 'Ilość',
            value: quantity,
            onChange: setValidQuantity,
            error: quantityError || props.ingredientsError,
            validate: quantityValidate,
            helperText: 'Podaj ilość',
        },
    ]


    return (
        <div style={styles.container}>
            {props.ingredientsError &&
                <Typography
                    color='error'
                    align='center'
                >
                    <b>Dodaj składnik!</b>
                </Typography>
            }
            <div style={styles.inputsDiv}>
                {inputs.map(input =>
                    <TextField
                        key={input.label}
                        style={styles.input}
                        variant='outlined'
                        fullWidth
                        label={input.label}
                        value={input.value}
                        error={input.error}
                        helperText={input.error && input.helperText}
                        onChange={evt => {
                            input.onChange(evt.target.value)
                            if (input.error) {
                                input.validate(evt.target.value)
                            }
                        }
                        }
                        onBlur={() => {
                            if (props.ingredients.length === 0 || input.value.length !== 0) {
                                input.validate(input.value)
                            }
                        }}
                        onKeyPress={submitOnEnter}
                        inputRef={input.inputRef}
                    />
                )}
                <Fab
                    style={styles.addButton}
                    size='small'
                    color='primary'
                    onClick={onSubmit}
                >
                    <AddIcon />
                </Fab>
            </div>
            {
                props.ingredients.length > 0 &&
                <Paper
                    style={styles.paper}
                    align='center'>
                    <Typography
                        style={styles.title}
                        align='center'
                    >
                        <strong>Składniki:</strong>
                    </Typography>
                    <ul
                        style={styles.ingredientsList}
                        align='left'>
                        {props.ingredients.map((ingredient, index) => (
                            <div
                                style={styles.singleIngredient}
                                key={ingredient.ingredient + ingredient.quantity + index}
                            >
                                <Typography
                                    style={styles.singleIngredientTypography}>
                                    <li style={styles.ingredientsListItem}>
                                        {ingredient.ingredient} - {ingredient.quantity}
                                    </li>
                                </Typography>
                                <IconButton
                                    style={styles.singleIngredientRemoveButton}
                                    size='small'
                                    onClick={() => {
                                        removeIngredient(index)
                                    }}
                                >
                                    <DeleteIcon color='secondary' />
                                </IconButton>
                            </div>
                        ))}
                    </ul>
                </Paper>
            }
        </div>
    )
}

export default Ingredients
