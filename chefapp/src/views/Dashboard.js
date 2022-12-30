import React from 'react'
import { Typography } from '@mui/material'

const Dashboard = props => {
  return (
    <div>
      <Typography
        variant='h2'
        align='center'
        style={{ marginTop: 100 }}
      >
        Witaj w aplikacji ChefApp!

      </Typography>
      <Typography
        variant='h5'
        align='justify'
        style={{
          marginTop: 50,
          marginLeft: 50,
          marginRight: 50,
        }}
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
    </div>
  )
}

export default Dashboard