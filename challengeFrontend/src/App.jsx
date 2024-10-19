import React, { useState } from 'react'
import './App.css'
import { Box, CssBaseline } from '@mui/material'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import CardEtherum from './components/cardEtherum'
import { setValue,setLoading } from './store/store'
function App () {
  let value = useSelector((state) => state.value)
  const Dispatcher = useDispatch()
  const onChange = (newValue) => {
    Dispatcher(setValue(newValue))
    //esperar 1000ms
    Dispatcher(setLoading(true))
    setTimeout(() => {
      Dispatcher(setLoading(false))
    }, 1000)
  }

  return (
    <>
      <CssBaseline />
      <Box width='100vw' height='100vh' display='flex' justifyContent='center' alignItems='center' sx={{ backgroundColor: 'GrayText' }} >
        <Box display='flex' justifyContent='center' alignItems='center' height='600px' width='500px'>
          {value.map((date) => { return date.format('DD/MM/YYYY') })}
        </Box>
        <Box>
          <CardEtherum value={value} onChange={onChange}/>
        </Box>
      </Box>
    </>
  )
}

export default App
