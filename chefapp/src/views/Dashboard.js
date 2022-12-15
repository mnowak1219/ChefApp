import React from 'react'
import { Typography } from '@mui/material'

const Dashboard = props => {
  return (
    <div>
      <Typography
        variant='h1'
        align='center'
        style={{ marginTop: 100 }}
      >
        Witaj w aplikacji ChefApp!
      </Typography>
    </div>
  )
}

export default Dashboard