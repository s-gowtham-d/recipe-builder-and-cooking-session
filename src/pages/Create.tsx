import { useState } from 'react'
import { Container, Box, Button, Snackbar, Alert } from '@mui/material'
import { Save } from '@mui/icons-material'
import { v4 as uuidv4 } from 'uuid'
import { useAppDispatch } from '../app/hooks'
import { addRecipe } from '../features/recipesSlice'
import RecipeHeader from '../components/RecipeBuilder/RecipeHeader'
import IngredientsSection from '../components/RecipeBuilder/IngredientsSection'
import StepsSection from '../components/RecipeBuilder/StepsSection'
import RecipeSummary from '../components/RecipeBuilder/RecipeSummary'
import type { Difficulty, Ingredient, RecipeStep, Recipe } from '../types/recipeTypes'
import { useNavigate } from 'react-router-dom'

export default function Create() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const [title, setTitle] = useState('')
    const [difficulty, setDifficulty] = useState<Difficulty>('Easy')
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [steps, setSteps] = useState<RecipeStep[]>([])
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error'
    })

    const base = { Easy: 1, Medium: 2, Hard: 3 }
    const totalTimeMinutes = steps.reduce((sum, s) => sum + s.durationMinutes, 0)
    const totalIngredients = ingredients.length
    const complexityScore = base[difficulty] * steps.length

    const addIngredient = () => {
        setIngredients([...ingredients, { id: uuidv4(), name: '', quantity: 1, unit: 'g' }])
    }

    const updateIngredient = (id: string, field: string, value: any) => {
        setIngredients(ingredients.map(ing =>
            ing.id === id ? { ...ing, [field]: value } : ing
        ))
    }

    const removeIngredient = (id: string) => {
        setIngredients(ingredients.filter(i => i.id !== id))
        setSteps(steps.map(step => ({
            ...step,
            ingredientIds: step.ingredientIds?.filter(ingId => ingId !== id)
        })))
    }

    const addStep = () => {
        setSteps([...steps, {
            id: uuidv4(),
            description: '',
            type: 'instruction',
            durationMinutes: 1
        }])
    }

    const updateStep = (id: string, field: string, value: any) => {
        setSteps(steps.map(step => {
            if (step.id !== id) return step

            if (field === 'type') {
                const { cookingSettings, ingredientIds, ...baseStep } = step
                return { ...baseStep, [field]: value }
            }

            return { ...step, [field]: value }
        }))
    }

    const removeStep = (id: string) => {
        setSteps(steps.filter(s => s.id !== id))
    }

    const reorderStep = (index: number, direction: 'up' | 'down') => {
        const newSteps = [...steps]
        const swapWith = direction === 'up' ? index - 1 : index + 1
        if (swapWith < 0 || swapWith >= steps.length) return
            ;[newSteps[index], newSteps[swapWith]] = [newSteps[swapWith], newSteps[index]]
        setSteps(newSteps)
    }

    const validate = (): string | null => {
        if (title.trim().length < 3) return 'Title must be at least 3 characters'
        if (ingredients.length < 1) return 'Add at least one ingredient'
        if (ingredients.some(ing => !ing.name || ing.name.trim() === '')) {
            return 'All ingredients must have a name'
        }
        if (steps.length < 1) return 'Add at least one step'
        if (steps.some(s => s.durationMinutes <= 0)) return 'All steps must have duration > 0'
        if (steps.some(s => s.type === 'cooking' && !s.cookingSettings)) {
            return 'Cooking steps must have temperature and speed settings'
        }
        // if (steps.some(s => s.type === 'instruction' && (!s.ingredientIds || s.ingredientIds.length === 0))) {
        //     return 'Instruction steps must have at least one ingredient'
        // }
        return null
    }

    const handleSave = () => {
        const error = validate()
        if (error) {
            setSnackbar({ open: true, message: error, severity: 'error' })
            return
        }

        const validIngredients = ingredients.filter(ing => ing.name && ing.name.trim() !== '')

        const validIngredientIds = new Set(validIngredients.map(i => i.id))
        const cleanedSteps = steps.map(step => ({
            ...step,
            ingredientIds: step.ingredientIds?.filter(id => validIngredientIds.has(id))
        }))

        const recipe: Recipe = {
            id: uuidv4(),
            title,
            difficulty,
            ingredients: validIngredients,
            steps: cleanedSteps,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        dispatch(addRecipe(recipe))

        const saved = JSON.parse(localStorage.getItem('recipes:v1') || '[]')
        saved.push(recipe)
        localStorage.setItem('recipes:v1', JSON.stringify(saved))

        setSnackbar({ open: true, message: '✅ Recipe saved successfully!', severity: 'success' })

        // setTimeout(() => {
        setTitle('')
        setDifficulty('Easy')
        setIngredients([])
        setSteps([])
        navigate('/')
        // }, 1000)
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <RecipeHeader
                title={title}
                difficulty={difficulty}
                onTitleChange={setTitle}
                onDifficultyChange={setDifficulty}
            />

            <IngredientsSection
                ingredients={ingredients}
                onAdd={addIngredient}
                onUpdate={updateIngredient}
                onRemove={removeIngredient}
            />

            <StepsSection
                steps={steps}
                ingredients={ingredients}
                onAdd={addStep}
                onUpdate={updateStep}
                onRemove={removeStep}
                onReorder={reorderStep}
            />

            <RecipeSummary
                totalTime={totalTimeMinutes}
                totalIngredients={totalIngredients}
                complexityScore={complexityScore}
                difficulty={difficulty}
            />

            <Box sx={{ textAlign: 'center' }}>
                <Button
                    variant="contained"
                    size="large"
                    startIcon={<Save />}
                    onClick={handleSave}
                    sx={{
                        px: 6,
                        py: 1.5,
                        borderRadius: 3,
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        boxShadow: 4,
                        '&:hover': { boxShadow: 8 }
                    }}
                >
                    Save Recipe
                </Button>
            </Box>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity={snackbar.severity} variant="filled" sx={{ borderRadius: 2 }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    )
}