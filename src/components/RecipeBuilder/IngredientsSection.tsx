import { Stack, Paper, Typography, Button, Box } from '@mui/material'
import IngredientItem from './IngredientItem'
import type { Ingredient } from '../../types/recipeTypes'

interface IngredientsSectionProps {
    ingredients: Ingredient[]
    onAdd: () => void
    onUpdate: (id: string, field: string, value: any) => void
    onRemove: (id: string) => void
}

export default function IngredientsSection({ ingredients, onAdd, onUpdate, onRemove }: IngredientsSectionProps) {
    return (
        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" fontWeight="600" color="primary">
                    🥘 Ingredients
                </Typography>
                <Button variant="contained" onClick={onAdd} size="small" sx={{ borderRadius: 2 }}>
                    + Add Ingredient
                </Button>
            </Stack>

            {ingredients.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                    <Typography>No ingredients yet. Click "Add Ingredient" to start.</Typography>
                </Box>
            ) : (
                <Stack spacing={2}>
                    {ingredients.map((ing, idx) => (
                        <IngredientItem
                            key={ing.id}
                            ingredient={ing}
                            index={idx}
                            onUpdate={onUpdate}
                            onRemove={onRemove}
                        />
                    ))}
                </Stack>
            )}
        </Paper>
    )
}