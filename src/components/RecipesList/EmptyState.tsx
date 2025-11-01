import { Box, Typography, Button } from '@mui/material'
import { Restaurant, Add } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

interface EmptyStateProps {
    hasFilters: boolean
}

export default function EmptyState({ hasFilters }: EmptyStateProps) {
    const navigate = useNavigate()

    if (hasFilters) {
        return (
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                    🔍 No recipes match your filters
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Try adjusting your filters to see more recipes
                </Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ textAlign: 'center', py: 8 }}>
            <Restaurant sx={{ fontSize: 100, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h4" gutterBottom fontWeight="bold">
                No Recipes Yet
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
                Start building your recipe collection by creating your first recipe!
            </Typography>
            <Button
                variant="contained"
                size="large"
                startIcon={<Add />}
                onClick={() => navigate('/create')}
                sx={{ mt: 2, borderRadius: 3, px: 4 }}
            >
                Create Your First Recipe
            </Button>
        </Box>
    )
}