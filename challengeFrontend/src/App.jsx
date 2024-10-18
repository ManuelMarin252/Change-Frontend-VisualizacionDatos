import React from 'react'
import './App.css'
import { Avatar, Box, Card, CardContent, CardHeader, CssBaseline } from '@mui/material'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateRangePicker } from '@mui/x-date-pickers-pro'
import { useState } from 'react'
import dayjs from 'dayjs'
function App () {
  const [value, setValue] = useState([dayjs(), dayjs()])
  const onChange = (newValue) => {
    setValue(newValue)
  }
  return (
    <>
      <CssBaseline />
      <Box width='100vw' height='100vh' display='flex' justifyContent='center' alignItems='center' sx={{ backgroundColor: 'GrayText' }} >
        <Box display='flex' justifyContent='center' alignItems='center' height='600px' width='500px'>
          {value.map((date) =>{return date.format('DD/MM/YYYY')})}
        </Box>
        <Box display='flex' justifyContent='center' alignItems='center' height='600px' width='500px'>
        <Card>
          <CardHeader title='ETH x USD' />
          <CardContent>
            <Box display='flex' justifyContent='center' alignItems='start' gap='10px' width='400px'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateRangePicker localeText={{start:"Desde",end:"Hasta"}} onChange={onChange}></DateRangePicker>
              </LocalizationProvider>
            </Box>
            <Box display='flex' justifyContent='center' alignItems='center' height='100px' width='400px'>
              <Avatar alt='Remy Sharp' src='' />
            </Box>
          </CardContent>
        </Card>
        </Box>
      </Box>
    </>
  )
}

export default App
