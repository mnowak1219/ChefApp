import React from 'react'

import { Typography, Paper, List, ListItem, ListItemIcon, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import DotIcon from '@mui/icons-material/Brightness1'
import { useHistory } from 'react-router-dom';
import imgPlacecholder from '../img/img-placeholder.svg'
import EditRecipe from '../components/EditRecipe'

const styles = {
  backToRecipes: { cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' },
  button: { maxWidth: '25%' },
  dialog: { maxWidth: 500, margin: 'auto' }
}

const SingleRecipe = props => {
  React.useEffect(() => {
    return () => {
      setIsEditeDialogOpen({});
    };
  }, []);
  const history = useHistory();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
  const [isEditeDialogOpen, setIsEditeDialogOpen] = React.useState(false)
  if (!props.data) {
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
          Nie znaleziono przepisu o identyfikatorze:
          <br />
          {props.param}
        </Typography>
        <Typography
          style={styles.backToRecipes}
          variant='h4'
          color='primary'
          align='center'
          onClick={props.back}
        >
          Wróć do przepisów
        </Typography>
      </div>
    )
  }

  return (
    <Paper
      style={{ padding: 20, maxWidth: 600, margin: '20px auto' }}
    >
      <div
        style={{ display: 'flex', flexWrap: 'wrap-reverse', alignItems: 'flex-end' }}
      >
        <div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1, margin: '20px 20px 0 20px', width: '50%' }}
        >
          <Typography
            style={{ maxWidth: 264, wordBreak: 'break-word' }}
            variant='h5'
            align='center'
            color='secondary'
            gutterBottom
          >
            <b>{props.data.name.toUpperCase()}</b>
          </Typography>
          <Typography
            style={{ fontSize: 15 }}
            align='center'
            gutterBottom
            paragraph
          >
            Czas przygotowywania: {props.data.time}min
          </Typography>
          <Typography
            style={{ marginTop: 5 }}
            align='center'
            color='secondary'
            gutterBottom
          >
            <b>Składniki:</b>
          </Typography>
          <List
            style={{ marginTop: -5 }}
          >
            {console.log(props.data.ingredients)}
            {props.data.ingredients.map((el, index) => (
              <ListItem
                style={{ paddingTop: 0, paddingBottom: 0, justifyContent: 'flex-start', alignItems: 'flex-start' }}
                key={el.ingredient + el.quantity + index}
              >
                <ListItemIcon
                  style={{ marginRight: -40 }}
                >
                  <DotIcon style={{ width: 7 }} />
                </ListItemIcon>
                <ListItemText
                  style={{ marginBottom: 0, marginTop: 0 }}
                  primary={el.ingredient + ' - ' + el.quantity}
                  primaryTypographyProps={{ style: { fontSize: 14 } }}
                />
              </ListItem>
            ))}
          </List>
        </div>
        <div
          style={{ width: '40%', maxHeight: 264, position: 'relative', margin: '0 auto' }}
        >
          <img
            style={{ width: '100%', maxHeight: 264, backgroundImage: 'url(' + imgPlacecholder + ')', backgroundSize: 'cover', backgroundPosition: 'center' }}
            src={props.data.photo}
            alt={props.data.name}
            onError={evt => evt.target.src = imgPlacecholder}
          />
        </div>
      </div>
      <div
        style={{ width: '100%', marginTop: 25 }}
      >
        <Typography
          variant='h5'
          align='center'
          color='secondary'
          gutterBottom
        >
          Sposób przygotowywania:
        </Typography>
        <Typography
          style={{ wordBreak: 'break-word', whiteSpace: 'pre-line', marginTop: 20 }}
          align='justify'
        >
          {props.data.description}
        </Typography>
      </div>
      <div style={{ width: '100%', marginTop: 25, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          style={{ margin: 10, maxWidth: '25%' }}
          variant='contained'
          color='primary'
          fullWidth
          onClick={() => history.goBack()}
        >
          Powrót
        </Button>

        {(() => {
          if (history.location.pathname.includes('/custom-recipes')) {
            return (
              <Button
                style={{ margin: 10, maxWidth: '25%' }}
                variant='contained'
                color='error'
                fullWidth
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                Usuń
              </Button>
            )
          }

          return null;
        })()}

        {(() => {
          if (history.location.pathname.includes('/custom-recipes')) {
            return (
              <Button
                style={{ margin: 10, maxWidth: '25%' }}
                variant='contained'
                color='secondary'
                fullWidth
                onClick={() => setIsEditeDialogOpen(true)}
              >
                Edytuj
              </Button>
            )
          }

          return null;
        })()}

      </div>
      <Dialog
        style={styles.dialog}
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle >{"Czy napewno chcesz usunąć przepis?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Przepis zostanie trwale usunięty. Nie można odwrócić tej operacji.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={styles.button}
            onClick={() => {
              props._deleteRecipe(
                props.param,
                props.back,
                () => setIsDeleteDialogOpen(false)
              )
            }}
            color="error"
            fullWidth
          >
            Usuń
          </Button>
          <Button
            style={styles.button}
            onClick={() => setIsDeleteDialogOpen(false)}
            color="secondary"
            autoFocus
            fullWidth
          >
            Anuluj
          </Button>
        </DialogActions>
      </Dialog>
      {
        isEditeDialogOpen &&
        <EditRecipe
          onClose={() => setIsEditeDialogOpen(false)}
          data={props.data}
          _editRecipe={props._editRecipe}
        />
      }
    </Paper >
  )
}

export default SingleRecipe