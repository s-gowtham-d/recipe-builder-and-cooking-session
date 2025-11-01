import { Stack, Paper, Typography, Button, Box } from '@mui/material'
import StepItem from './StepItem'
import type { RecipeStep, Ingredient } from '../../types/recipeTypes'

interface StepsSectionProps {
    steps: RecipeStep[]
    ingredients: Ingredient[]
    onAdd: () => void
    onUpdate: (id: string, field: string, value: any) => void
    onRemove: (id: string) => void
    onReorder: (index: number, direction: 'up' | 'down') => void
}

export default function StepsSection({ steps, ingredients, onAdd, onUpdate, onRemove, onReorder }: StepsSectionProps) {
    return (
        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" fontWeight="600" color="primary">
                    📋 Cooking Steps
                </Typography>
                <Button variant="contained" onClick={onAdd} size="small" sx={{ borderRadius: 2 }}>
                    + Add Step
                </Button>
            </Stack>

            {steps.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                    <Typography>No steps yet. Click "Add Step" to start.</Typography>
                </Box>
            ) : (
                <Stack spacing={2}>
                    {steps.map((step, idx) => (
                        <StepItem
                            key={step.id}
                            step={step}
                            index={idx}
                            totalSteps={steps.length}
                            ingredients={ingredients}
                            onUpdate={onUpdate}
                            onRemove={onRemove}
                            onReorder={onReorder}
                        />
                    ))}
                </Stack>
            )}
        </Paper>
    )
}
