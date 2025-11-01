import { Paper, Stack, Typography, Chip, IconButton } from '@mui/material'
import { Star, StarBorder, AccessTime } from '@mui/icons-material'
import type { Recipe, Difficulty } from '../../types/recipeTypes'

interface RecipeHeaderProps {
    recipe: Recipe
    totalTime: number
    onToggleFavorite: () => void
}

export default function RecipeHeader({ recipe, totalTime, onToggleFavorite }: RecipeHeaderProps) {
    const getDifficultyColor = (difficulty: Difficulty) => {
        switch (difficulty) {
            case 'Easy': return 'success'
            case 'Medium': return 'warning'
            case 'Hard': return 'error'
            default: return 'default'
        }
    }

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 3, bgcolor: 'primary.main', color: 'white' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack spacing={1} flex={1}>
                    <Typography variant="h4" fontWeight="bold">
                        {recipe.title}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Chip
                            label={recipe.difficulty}
                            size="small"
                            color={getDifficultyColor(recipe.difficulty) as any}
                            sx={{ fontWeight: 'bold' }}
                        />
                        <Chip
                            icon={<AccessTime sx={{ fontSize: 16, color: 'white !important' }} />}
                            label={`${totalTime} min`}
                            size="small"
                            sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 'bold' }}
                        />
                    </Stack>
                </Stack>
                <IconButton
                    onClick={onToggleFavorite}
                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}
                >
                    {recipe.isFavorite ? <Star sx={{ color: '#ffc107' }} /> : <StarBorder sx={{ color: 'white' }} />}
                </IconButton>
            </Stack>
        </Paper>
    )
}
