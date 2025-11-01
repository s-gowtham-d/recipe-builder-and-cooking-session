import { Paper, Box, Typography, Stack, Chip } from '@mui/material'
import { CheckCircle, RadioButtonChecked, RadioButtonUnchecked } from '@mui/icons-material'
import type { RecipeStep } from '../../types/recipeTypes'

interface TimelineProps {
    steps: RecipeStep[]
    currentStepIndex: number
}

export default function Timeline({ steps, currentStepIndex }: TimelineProps) {
    return (
        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                📋 Timeline
            </Typography>
            <Stack spacing={1}>
                {steps.map((step, idx) => {
                    const isCompleted = idx < currentStepIndex
                    const isCurrent = idx === currentStepIndex
                    const isUpcoming = idx > currentStepIndex

                    return (
                        <Box
                            key={step.id}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                p: 1.5,
                                borderRadius: 2,
                                bgcolor: isCurrent ? 'action.selected' : 'transparent',
                                border: isCurrent ? 2 : 1,
                                borderColor: isCurrent ? 'primary.main' : 'divider',
                                opacity: isUpcoming ? 0.6 : 1
                            }}
                        >
                            {isCompleted && <CheckCircle color="success" />}
                            {isCurrent && <RadioButtonChecked color="primary" />}
                            {isUpcoming && <RadioButtonUnchecked color="disabled" />}

                            <Box flex={1}>
                                <Typography variant="body2" fontWeight={isCurrent ? 'bold' : 'normal'}>
                                    {step.description.length > 50
                                        ? step.description.substring(0, 50) + '...'
                                        : step.description}
                                </Typography>
                            </Box>

                            <Chip
                                label={`${step.durationMinutes} min`}
                                size="small"
                                color={step.type === 'cooking' ? 'error' : 'info'}
                                variant={isCurrent ? 'filled' : 'outlined'}
                            />
                        </Box>
                    )
                })}
            </Stack>
        </Paper>
    )
}

