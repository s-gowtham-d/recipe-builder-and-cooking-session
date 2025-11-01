import { useState, useMemo } from 'react'
import { Container, Grid, Typography, Button, Stack, Box, Fab } from '@mui/material'
import { Add, Restaurant } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { toggleFavorite } from '../features/recipesSlice'
import RecipeCard from '../components/RecipesList/RecipeCard'
import FilterBar from '../components/RecipesList/FilterBar'
import EmptyState from '../components/RecipesList/EmptyState'
import StatsBar from '../components/RecipesList/StatsBar'
import type { Difficulty, Recipe } from '../types/recipeTypes'

export default function Recipes() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const recipes = useAppSelector((state) => state.recipes.items)

    const [selectedDifficulties, setSelectedDifficulties] = useState<Difficulty[]>([])
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

    // useEffect(() => {
    //     const saved = localStorage.getItem('recipes:v1')
    //     if (saved) {
    //         try {
    //             const parsed: Recipe[] = JSON.parse(saved)

    //         } catch (error) {
    //             console.error('Failed to parse recipes from localStorage:', error)
    //         }
    //     }
    // }, [])

    const filteredAndSortedRecipes = useMemo(() => {
        let result = [...recipes]

        if (selectedDifficulties.length > 0) {
            result = result.filter(recipe => selectedDifficulties.includes(recipe.difficulty))
        }

        result.sort((a, b) => {
            const timeA = a.steps.reduce((sum, s) => sum + s.durationMinutes, 0)
            const timeB = b.steps.reduce((sum, s) => sum + s.durationMinutes, 0)
            return sortOrder === 'asc' ? timeA - timeB : timeB - timeA
        })

        return result
    }, [recipes, selectedDifficulties, sortOrder])

    const stats = useMemo(() => {
        const totalTime = recipes.reduce((sum, recipe) => {
            return sum + recipe.steps.reduce((stepSum, s) => stepSum + s.durationMinutes, 0)
        }, 0)
        const favorites = recipes.filter(r => r.isFavorite).length

        return {
            totalRecipes: recipes.length,
            favorites,
            totalTime
        }
    }, [recipes])

    const handleToggleFavorite = (id: string) => {
        dispatch(toggleFavorite(id))

        const saved = JSON.parse(localStorage.getItem('recipes:v1') || '[]')
        const updated = saved.map((r: Recipe) =>
            r.id === id ? { ...r, isFavorite: !r.isFavorite } : r
        )
        localStorage.setItem('recipes:v1', JSON.stringify(updated))
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'stretch', sm: 'center' }}
                spacing={2}
                mb={4}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Restaurant sx={{ fontSize: 40, color: 'primary.main' }} />
                    <Typography variant="h3" fontWeight="bold" color="primary">
                        My Recipes
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    size="large"
                    startIcon={<Add />}
                    onClick={() => navigate('/create')}
                    sx={{ borderRadius: 3, px: 3 }}
                >
                    Create Recipe
                </Button>
            </Stack>

            {recipes.length > 0 && (
                <>
                    <StatsBar {...stats} />
                    <FilterBar
                        selectedDifficulties={selectedDifficulties}
                        sortOrder={sortOrder}
                        onDifficultyChange={setSelectedDifficulties}
                        onSortChange={setSortOrder}
                    />
                </>
            )}

            {filteredAndSortedRecipes.length === 0 ? (
                <EmptyState hasFilters={selectedDifficulties.length > 0} />
            ) : (
                <Grid container spacing={3}>
                    {filteredAndSortedRecipes.map((recipe) => (
                        <Grid key={recipe.id}>
                            <RecipeCard
                                recipe={recipe}
                                onToggleFavorite={handleToggleFavorite}
                            />
                        </Grid>
                    ))}

                </Grid>
            )}

            {recipes.length > 0 && (
                <Fab
                    color="primary"
                    aria-label="add recipe"
                    onClick={() => navigate('/create')}
                    sx={{
                        position: 'fixed',
                        bottom: 24,
                        right: 24,
                        display: { xs: 'flex', sm: 'none' }
                    }}
                >
                    <Add />
                </Fab>
            )}
        </Container>
    )
}