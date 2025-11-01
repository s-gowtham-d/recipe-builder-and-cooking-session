import { Stack, Paper, Chip, TextField, Button, MenuItem, Fade } from '@mui/material'
import type { Ingredient } from '../../types/recipeTypes'

interface IngredientItemProps {
    ingredient: Ingredient
    index: number
    onUpdate: (id: string, field: string, value: any) => void
    onRemove: (id: string) => void
}

export default function IngredientItem({ ingredient, index, onUpdate, onRemove }: IngredientItemProps) {
    return (
        <Fade in timeout={300}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, '&:hover': { boxShadow: 2 } }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Chip label={`#${index + 1}`} size="small" color="primary" />
                    <TextField
                        label="Ingredient Name"
                        value={ingredient.name}
                        onChange={(e) => onUpdate(ingredient.id, 'name', e.target.value)}
                        fullWidth
                        size="small"
                        required
                    />
                    <TextField
                        label="Quantity"
                        type="number"
                        value={ingredient.quantity}
                        onChange={(e) => onUpdate(ingredient.id, 'quantity', +e.target.value)}
                        sx={{ width: 120 }}
                        size="small"
                        inputProps={{ step: 1 }}
                    />
                    <TextField
                        label="Unit"
                        value={ingredient.unit}
                        onChange={(e) => onUpdate(ingredient.id, 'unit', e.target.value)}
                        sx={{ width: 100 }}
                        size="small"
                        select
                    >
                        <MenuItem value="g">g</MenuItem>
                        <MenuItem value="ml">ml</MenuItem>
                        <MenuItem value="pcs">pcs</MenuItem>
                        <MenuItem value="cup">cup</MenuItem>
                        <MenuItem value="tbsp">tbsp</MenuItem>
                        <MenuItem value="tsp">tsp</MenuItem>
                    </TextField>
                    <Button
                        color="error"
                        onClick={() => onRemove(ingredient.id)}
                        size="small"
                        variant="outlined"
                        sx={{ minWidth: 'auto', px: 2 }}
                    >
                        ✕
                    </Button>
                </Stack>
            </Paper>
        </Fade>
    )
}
