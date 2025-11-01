import { Paper, Box, Typography, Stack, Chip, CircularProgress } from '@mui/material'
import type { RecipeStep, Ingredient } from '../../types/recipeTypes'

interface ActiveStepPanelProps {
    step: RecipeStep
    stepIndex: number
    totalSteps: number
    stepRemainingSec: number
    stepDurationSec: number
    ingredients: Ingredient[]
}

export default function ActiveStepPanel({
    step,
    stepIndex,
    totalSteps,
    stepRemainingSec,
    stepDurationSec,
    ingredients
}: ActiveStepPanelProps) {
    const stepElapsedSec = Math.max(0, stepDurationSec - stepRemainingSec)
    const stepProgressPercent = Math.round((stepElapsedSec / stepDurationSec) * 100)
    const minutes = Math.floor(stepRemainingSec / 60)
    const seconds = stepRemainingSec % 60

    return (
        <Paper elevation={4} sx={{ p: 4, mb: 3, borderRadius: 3, bgcolor: 'background.paper' }}>
            <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                Step {stepIndex + 1} of {totalSteps}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress
                        variant="determinate"
                        value={stepProgressPercent}
                        size={100}
                        thickness={4}
                        sx={{ color: step.type === 'cooking' ? 'error.main' : 'info.main' }}
                    />
                    <Box
                        sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column'
                        }}
                    >
                        <Typography variant="h5" fontWeight="bold" aria-live="polite" aria-atomic="true">
                            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {stepProgressPercent}%
                        </Typography>
                    </Box>
                </Box>

                <Box flex={1}>
                    <Typography variant="h6" gutterBottom>
                        {step.description}
                    </Typography>

                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                        {step.type === 'cooking' && step.cookingSettings && (
                            <>
                                <Chip
                                    label={`🌡️ ${step.cookingSettings.temperature}°C`}
                                    color="error"
                                    size="small"
                                    variant="outlined"
                                />
                                <Chip
                                    label={`⚡ Speed ${step.cookingSettings.speed}`}
                                    color="error"
                                    size="small"
                                    variant="outlined"
                                />
                            </>
                        )}

                        {step.type === 'instruction' && step.ingredientIds && step.ingredientIds.length > 0 && (
                            <>
                                {step.ingredientIds.map((id) => {
                                    const ingredient = ingredients.find((i) => i.id === id)
                                    return ingredient ? (
                                        <Chip
                                            key={id}
                                            label={`${ingredient.name} (${ingredient.quantity}${ingredient.unit})`}
                                            color="info"
                                            size="small"
                                            variant="outlined"
                                        />
                                    ) : null
                                })}
                            </>
                        )}
                    </Stack>
                </Box>
            </Box>
        </Paper>
    )
}
