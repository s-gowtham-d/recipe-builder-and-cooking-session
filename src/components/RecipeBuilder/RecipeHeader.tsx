import { Stack, TextField, FormControl, InputLabel, Select, MenuItem, Paper, Typography } from '@mui/material'
import { Restaurant } from '@mui/icons-material'
import type { Difficulty } from '../../types/recipeTypes'

interface RecipeHeaderProps {
    title: string
    difficulty: Difficulty
    onTitleChange: (value: string) => void
    onDifficultyChange: (value: Difficulty) => void
}

export default function RecipeHeader({ title, difficulty, onTitleChange, onDifficultyChange }: RecipeHeaderProps) {
    return (
        <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: 'primary.main', color: 'white', borderRadius: 3 }}>
            <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                <Restaurant sx={{ fontSize: 40 }} />
                <Typography variant="h4" fontWeight="bold">
                    Create New Recipe
                </Typography>
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                    label="Recipe Title"
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    fullWidth
                    required
                    variant="filled"
                    sx={{
                        bgcolor: 'rgba(255,255,255,0.1)',
                        borderRadius: 1,
                        '& .MuiFilledInput-root': { color: 'white' },
                        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                        '& .MuiFilledInput-underline:before': { borderColor: 'rgba(255,255,255,0.3)' },
                        '& .MuiFilledInput-underline:after': { borderColor: 'white' }
                    }}
                    inputProps={{ minLength: 3 }}
                />
                <FormControl variant="filled" sx={{ minWidth: 200, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}>
                    <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>Difficulty</InputLabel>
                    <Select
                        value={difficulty}
                        onChange={(e) => onDifficultyChange(e.target.value as Difficulty)}
                        sx={{
                            color: 'white',
                            '& .MuiSelect-icon': { color: 'white' },
                            '&:before': { borderColor: 'rgba(255,255,255,0.3)' },
                            '&:after': { borderColor: 'white' }
                        }}
                    >
                        <MenuItem value="Easy">🟢 Easy</MenuItem>
                        <MenuItem value="Medium">🟡 Medium</MenuItem>
                        <MenuItem value="Hard">🔴 Hard</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
        </Paper>
    )
}