import {
    Paper,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Box,
    type SelectChangeEvent,
    OutlinedInput
} from '@mui/material'
import { FilterList, Sort } from '@mui/icons-material'
import type { Difficulty } from '../../types/recipeTypes'

interface FilterBarProps {
    selectedDifficulties: Difficulty[]
    sortOrder: 'asc' | 'desc'
    onDifficultyChange: (difficulties: Difficulty[]) => void
    onSortChange: (order: 'asc' | 'desc') => void
}

export default function FilterBar({
    selectedDifficulties,
    sortOrder,
    onDifficultyChange,
    onSortChange
}: FilterBarProps) {
    const handleDifficultyChange = (event: SelectChangeEvent<Difficulty[]>) => {
        const value = event.target.value
        onDifficultyChange(typeof value === 'string' ? value.split(',') as Difficulty[] : value)
    }

    return (
        <Paper elevation={2} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                alignItems={{ xs: 'stretch', sm: 'center' }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FilterList color="primary" />
                    <FormControl size="small" sx={{ minWidth: 200 }}>
                        <InputLabel>Filter by Difficulty</InputLabel>
                        <Select
                            multiple
                            value={selectedDifficulties}
                            onChange={handleDifficultyChange}
                            input={<OutlinedInput label="Filter by Difficulty" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip
                                            key={value}
                                            label={value}
                                            size="small"
                                            color={
                                                value === 'Easy' ? 'success' :
                                                    value === 'Medium' ? 'warning' : 'error'
                                            }
                                        />
                                    ))}
                                </Box>
                            )}
                        >
                            <MenuItem value="Easy">🟢 Easy</MenuItem>
                            <MenuItem value="Medium">🟡 Medium</MenuItem>
                            <MenuItem value="Hard">🔴 Hard</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Sort color="primary" />
                    <FormControl size="small" sx={{ minWidth: 180 }}>
                        <InputLabel>Sort by Time</InputLabel>
                        <Select
                            value={sortOrder}
                            label="Sort by Time"
                            onChange={(e) => onSortChange(e.target.value as 'asc' | 'desc')}
                        >
                            <MenuItem value="asc">⏱️ Shortest First</MenuItem>
                            <MenuItem value="desc">⏱️ Longest First</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Stack>
        </Paper>
    )
}
