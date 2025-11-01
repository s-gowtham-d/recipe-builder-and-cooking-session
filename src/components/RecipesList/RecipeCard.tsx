import { Card, CardContent, CardActions, Typography, Chip, Stack, IconButton, Box } from '@mui/material'
import { Star, StarBorder, AccessTime, Restaurant } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import type { Recipe } from '../../types/recipeTypes'

interface RecipeCardProps {
    recipe: Recipe
    onToggleFavorite: (id: string) => void
}

export default function RecipeCard({ recipe, onToggleFavorite }: RecipeCardProps) {
    const navigate = useNavigate()

    const totalTime = recipe.steps.reduce((sum, s) => sum + s.durationMinutes, 0)

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return 'success'
            case 'Medium': return 'warning'
            case 'Hard': return 'error'
            default: return 'default'
        }
    }

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                }
            }}
            onClick={() => navigate(`/cook/${recipe.id}`)}
        >
            <Box
                sx={{
                    height: 140,
                    background: `linear-gradient(135deg, ${recipe.difficulty === 'Easy' ? '#4caf50' :
                        recipe.difficulty === 'Medium' ? '#ff9800' : '#f44336'
                        } 0%, ${recipe.difficulty === 'Easy' ? '#81c784' :
                            recipe.difficulty === 'Medium' ? '#ffb74d' : '#e57373'
                        } 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                }}
            >
                <Restaurant sx={{ fontSize: 60, color: 'white', opacity: 0.9 }} />
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'rgba(255,255,255,0.9)',
                        '&:hover': { bgcolor: 'white' }
                    }}
                    onClick={(e) => {
                        e.stopPropagation()
                        onToggleFavorite(recipe.id)
                    }}
                >
                    {recipe.isFavorite ? (
                        <Star sx={{ color: '#ffc107' }} />
                    ) : (
                        <StarBorder />
                    )}
                </IconButton>
            </Box>

            <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                <Typography
                    variant="h6"
                    component="h2"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        minHeight: '3.6em'
                    }}
                >
                    {recipe.title}
                </Typography>

                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                    <Chip
                        label={recipe.difficulty}
                        size="small"
                        color={getDifficultyColor(recipe.difficulty) as any}
                        sx={{ fontWeight: 'bold' }}
                    />
                    <Chip
                        icon={<AccessTime sx={{ fontSize: 16 }} />}
                        label={`${totalTime} min`}
                        size="small"
                        variant="outlined"
                    />
                </Stack>

                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        🥗 {recipe.ingredients.length} ingredients
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        📋 {recipe.steps.length} steps
                    </Typography>
                </Box>
            </CardContent>

            <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ width: '100%', textAlign: 'right' }}
                >
                    Created {new Date(recipe.createdAt).toLocaleDateString()}
                </Typography>
            </CardActions>
        </Card>
    )
}
