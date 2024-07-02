import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import productsSlice from "./products/productsSlice"

export const store = configureStore({
    reducer:{
        products:productsSlice
    },
    
})
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
