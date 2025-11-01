import { Paper, Stack, Box, Typography } from '@mui/material'
import type { StatsBarProps } from '../../types'


export default function StatsBar({ totalRecipes, favorites, totalTime }: StatsBarProps) {
    return (
        <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: 2, bgcolor: 'primary.50' }}>
            <Stack direction="row" spacing={4} justifyContent="center" flexWrap="wrap">
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight="bold" color="primary">
                        {totalRecipes}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Total Recipes
                    </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight="bold" color="warning.main">
                        {favorites}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Favorites ⭐
                    </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight="bold" color="secondary">
                        {totalTime}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Total Minutes
                    </Typography>
                </Box>
            </Stack>
        </Paper>
    )
}