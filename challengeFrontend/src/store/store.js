import { createSlice, configureStore } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

const initialState = {
  value: [dayjs(Date.now()), dayjs(Date.now())],
  loading: false,
}

const valueSlice = createSlice({
  name: 'value',
  initialState,
  reducers: {
    setValue: (state, action) => {
      if(action.payload[0] > action.payload[1]){
        action.payload = [action.payload[1], action.payload[0]]
      }
      if(action.payload[0] === null || action.payload[1] === null){
        action.payload = [dayjs(Date.now()), dayjs(Date.now())]
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})

const store = configureStore({
  reducer: valueSlice.reducer
})
export const { setValue } = valueSlice.actions
export const { setLoading } = valueSlice.actions
export default store
