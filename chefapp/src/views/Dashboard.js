import React from 'react'
import { Typography } from '@mui/material'
import { Button, Paper } from '@mui/material'

const styles = {
  container: { width: '100%', paddingBottom: '5vh', border: 'none' },
  buttonDiv: { width: '40%', margin: 'auto', },
  buttonContainer: { marginTop: '50px', display: 'flex', justifyContent: 'center' },
  typography: { marginTop: 50, marginLeft: 50, marginRight: 50, },
  paper: { paddingTop: '5vh', paddingBottom: '5vh', border: 'none' }
}

const Dashboard = props => {
  return (
    <Paper
      variant="outlined"
      square
      style={styles.paper}
    >
      <Typography
        variant='h2'
        align='center'
      >
        Witaj w aplikacji ChefApp!

      </Typography>
      <Typography
        variant='h5'
        align='justify'
        style={styles.typography}
      >
        Dziękujemy, że tu jesteś i mamy nadzieję, że zostaniesz z nami na dłużej. Dzięki wbudowanej bazie przepisów nasza aplikacja to miejsce, w którym każdy użytkownik może poznać wiele sprawdzonych przepisów na pyszne dania. Możesz również cieszyć się dostępem do funkcjonalności takich jak przechowywanie i edytowanie swoich własnych przepisów. Mamy nadzieję, że nasza aplikacja pomoże Ci w tworzeniu wyjątkowych potraw dla siebie i swoich bliskich.
      </Typography>
      <Typography
        variant='h5'
        align='left'
        style={{
          marginTop: 20,
          marginLeft: 50,
          marginRight: 50,
        }}
      >
        Smacznego!
      </Typography>
      <div style={styles.buttonContainer}>
        <div style={styles.buttonDiv}>
          <Button
            size='large'
            color='primary'
            variant='contained'
            fullWidth={true}
            onClick={() => props.history.push('/custom-recipes')}
          >
            Pokaż własne przepisy
          </Button>
        </div>
        <div style={styles.buttonDiv}>
          <Button
            size='large'
            color='primary'
            variant='contained'
            fullWidth={true}
            onClick={() => props.history.push('/base-recipes')}
          >
            Pokaż bazowe przepisy
          </Button>
        </div>
      </div>
    </Paper>
  )
}

export default Dashboard