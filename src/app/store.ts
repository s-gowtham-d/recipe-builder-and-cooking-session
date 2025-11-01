import { configureStore, combineReducers } from '@reduxjs/toolkit'
import counterReducer from '../features/counterSlice'
import recipesReducer from '../features/recipesSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import sessionReducer from '../features/sessionSlice'

const persistConfig = {
    key: 'root',
    storage,
    // whitelist: ['counter'],
}

const rootReducer = combineReducers({
    counter: counterReducer,
    recipes: recipesReducer,
    session: sessionReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
