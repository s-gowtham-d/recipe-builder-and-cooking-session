import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Recipe } from '../types/recipeTypes'

interface RecipesState {
    items: Recipe[]
    isHydrated: boolean
}

const initialState: RecipesState = {
    items: [],
    isHydrated: false
}

const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        // Hydrate from localStorage
        hydrateRecipes: (state, action: PayloadAction<Recipe[]>) => {
            state.items = action.payload
            state.isHydrated = true
        },
        addRecipe: (state, action: PayloadAction<Recipe>) => {
            state.items.push(action.payload)
            // Persist to localStorage
            localStorage.setItem('recipes:v1', JSON.stringify(state.items))
        },
        updateRecipe: (state, action: PayloadAction<Recipe>) => {
            const index = state.items.findIndex((r) => r.id === action.payload.id)
            if (index !== -1) {
                state.items[index] = action.payload
                localStorage.setItem('recipes:v1', JSON.stringify(state.items))
            }
        },
        toggleFavorite: (state, action: PayloadAction<string>) => {
            const recipe = state.items.find((r) => r.id === action.payload)
            if (recipe) {
                recipe.isFavorite = !recipe.isFavorite
                localStorage.setItem('recipes:v1', JSON.stringify(state.items))
            }
        },
        deleteRecipe: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((r) => r.id !== action.payload)
            localStorage.setItem('recipes:v1', JSON.stringify(state.items))
        }
    },
})

export const { hydrateRecipes, addRecipe, updateRecipe, toggleFavorite, deleteRecipe } = recipesSlice.actions
export default recipesSlice.reducer
