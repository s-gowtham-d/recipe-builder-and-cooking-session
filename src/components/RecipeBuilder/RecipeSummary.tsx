import { Paper, Typography, Stack, Chip } from '@mui/material'
import type { Difficulty } from '../../types/recipeTypes'

interface RecipeSummaryProps {
    totalTime: number
    totalIngredients: number
    complexityScore: number
    difficulty: Difficulty
}

export default function RecipeSummary({ totalTime, totalIngredients, complexityScore, difficulty }: RecipeSummaryProps) {
    const getDifficultyColor = (diff: Difficulty): 'success' | 'warning' | 'error' | 'default' => {
        switch (diff) {
            case 'Easy': return 'success'
            case 'Medium': return 'warning'
            case 'Hard': return 'error'
            default: return 'default'
        }
    }

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 3, bgcolor: 'grey.50' }}>
            <Typography variant="h6" fontWeight="600" mb={2} color="primary">
                📊 Recipe Summary
            </Typography>
            <Stack direction="row" spacing={3} flexWrap="wrap">
                <Chip icon={<span>⏱️</span>} label={`${totalTime} minutes`} color="primary" />
                <Chip icon={<span>🥗</span>} label={`${totalIngredients} ingredients`} color="secondary" />
                <Chip icon={<span>⭐</span>} label={`Score: ${complexityScore}`} />
                <Chip label={difficulty} color={getDifficultyColor(difficulty)} />
            </Stack>
        </Paper>
    )
}
