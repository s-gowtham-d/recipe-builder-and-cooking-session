import { Stack, Paper, Chip, TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Fade } from '@mui/material'
import type { RecipeStep, Ingredient } from '../../types/recipeTypes'

interface StepItemProps {
    step: RecipeStep
    index: number
    totalSteps: number
    ingredients: Ingredient[]
    onUpdate: (id: string, field: string, value: any) => void
    onRemove: (id: string) => void
    onReorder: (index: number, direction: 'up' | 'down') => void
}

export default function StepItem({ step, index, totalSteps, ingredients, onUpdate, onRemove, onReorder }: StepItemProps) {
    return (
        <Fade in timeout={300}>
            <Paper
                variant="outlined"
                sx={{
                    p: 3,
                    borderRadius: 2,
                    border: '2px solid',
                    borderColor: step.type === 'cooking' ? 'error.light' : 'info.light',
                    '&:hover': { boxShadow: 4 }
                }}
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Chip
                        label={`Step ${index + 1}`}
                        color={step.type === 'cooking' ? 'error' : 'info'}
                        sx={{ fontWeight: 'bold' }}
                    />
                    <Stack direction="row" spacing={1}>
                        <Button
                            size="small"
                            onClick={() => onReorder(index, 'up')}
                            disabled={index === 0}
                            variant="outlined"
                        >
                            ↑
                        </Button>
                        <Button
                            size="small"
                            onClick={() => onReorder(index, 'down')}
                            disabled={index === totalSteps - 1}
                            variant="outlined"
                        >
                            ↓
                        </Button>
                        <Button size="small" color="error" onClick={() => onRemove(step.id)} variant="outlined">
                            Delete
                        </Button>
                    </Stack>
                </Stack>

                <TextField
                    label="Step Description"
                    value={step.description}
                    onChange={(e) => onUpdate(step.id, 'description', e.target.value)}
                    fullWidth
                    multiline
                    rows={2}
                    required
                    sx={{ mb: 2 }}
                />

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2}>
                    <FormControl fullWidth>
                        <InputLabel>Step Type</InputLabel>
                        <Select
                            value={step.type}
                            label="Step Type"
                            onChange={(e) => onUpdate(step.id, 'type', e.target.value as 'cooking' | 'instruction')}
                        >
                            <MenuItem value="cooking">🔥 Cooking</MenuItem>
                            <MenuItem value="instruction">📝 Instruction</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="Duration (minutes)"
                        type="number"
                        value={step.durationMinutes}
                        onChange={(e) => onUpdate(step.id, 'durationMinutes', +e.target.value)}
                        fullWidth
                        required
                        inputProps={{ min: 1 }}
                    />
                </Stack>

                {step.type === 'cooking' && (
                    <Stack direction="row" spacing={2}>
                        <TextField
                            label="Temperature (°C)"
                            type="number"
                            value={step.cookingSettings?.temperature ?? ""}
                            onChange={(e) => onUpdate(step.id, 'cookingSettings', {
                                ...step.cookingSettings,
                                temperature: +e.target.value,
                                speed: step.cookingSettings?.speed || 1
                            })}
                            fullWidth
                            required
                            inputProps={{ min: 40, max: 200 }}
                        />
                        <TextField
                            label="Speed (1-5)"
                            type="number"
                            value={step.cookingSettings?.speed ?? ""}
                            onChange={(e) => onUpdate(step.id, 'cookingSettings', {
                                ...step.cookingSettings,
                                temperature: step.cookingSettings?.temperature || 40,
                                speed: +e.target.value
                            })}
                            fullWidth
                            required
                            inputProps={{ min: 1, max: 5 }}
                        />
                    </Stack>
                )}

                {step.type === 'instruction' && ingredients.length > 0 && (
                    <FormControl fullWidth>
                        <InputLabel>Related Ingredients</InputLabel>
                        <Select
                            multiple
                            value={step.ingredientIds || []}
                            label="Related Ingredients"
                            onChange={(e) => onUpdate(step.id, 'ingredientIds', e.target.value)}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((id) => (
                                        <Chip key={id} label={ingredients.find(i => i.id === id)?.name || id} size="small" />
                                    ))}
                                </Box>
                            )}
                        >
                            {/* {ingredients.map((ing) => (
                                <MenuItem key={ing.id} value={ing.id}>
                                    {ing.name}
                                </MenuItem>
                            ))} */}

                            {ingredients.map((ing) => {
                                if (ing.name.trim() === '') return null;
                                return (
                                    <MenuItem key={ing.id} value={ing.id}>
                                        {ing.name}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                )}
            </Paper>
        </Fade>
    )
}
