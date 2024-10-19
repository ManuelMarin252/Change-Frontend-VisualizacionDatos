import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateRangePicker } from '@mui/x-date-pickers-pro'
import { Linechart } from './LineChart'
import { Box, Card, CardContent, CardHeader } from '@mui/material'
import { useSelector } from 'react-redux'
import React from 'react'
// eslint-disable-next-line react/prop-types
export default function CardEtherum ({ value, onChange }) {
  const loading = useSelector((state) => state.loading)
  return (<Box display='flex' justifyContent='center' alignItems='center' height='700px' width='500px'>
                  <Card>
          <CardHeader title='ETH x USD' />
          <CardContent sx ={{ display: 'flex', flexDirection: 'column' }}>
            <Box display='flex' justifyContent='center' alignItems='start' gap='10px' width='100%'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateRangePicker value={value} localeText={{ start: 'Desde', end: 'Hasta' }} sx={{ width: '100%' }} onChange={onChange}></DateRangePicker>
              </LocalizationProvider>
            </Box>
            <Box display='flex' justifyContent='center' alignItems='center' height='400px' width='500px'>
              { loading === true ? ('Cargando...') :
                (<Linechart/>)}
            </Box>
          </CardContent>
        </Card>
        </Box>)
}
