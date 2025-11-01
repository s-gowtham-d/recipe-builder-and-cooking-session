import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Box, Snackbar, Alert } from '@mui/material'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { toggleFavorite } from '../features/recipesSlice'
import {
    startSession,
    initializeStep,
    pauseSession,
    resumeSession,
    stopCurrentStep,
} from '../features/sessionSlice'
import RecipeHeader from '../components/CookingSession/RecipeHeader'
import ActiveStepPanel from '../components/CookingSession/ActiveStepPanel'
import ControlButtons from '../components/CookingSession/ControlButtons'
import Timeline from '../components/CookingSession/Timeline'
import OverallProgress from '../components/CookingSession/OverallProgress'
import { useState } from 'react'

export default function Cook() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [snackbar, setSnackbar] = useState({ open: false, message: '' })

    const recipe = useAppSelector((state) => state.recipes.items.find((r) => r.id === id))
    const activeRecipeId = useAppSelector((state) => state.session.activeRecipeId)
    const session = useAppSelector((state) => (id ? state.session.byRecipeId[id] : null))

    const hasOtherActiveSession = activeRecipeId && activeRecipeId !== id

    useEffect(() => {
        if (!recipe) {
            navigate('/recipes')
            return
        }
    }, [recipe, navigate])

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.code === 'Space' && session) {
                e.preventDefault()
                if (session.isRunning) {
                    dispatch(pauseSession(id!))
                } else {
                    dispatch(resumeSession(id!))
                }
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [session, id, dispatch])

    if (!recipe || !id) return null

    const totalDurationSec = recipe.steps.reduce((sum, s) => sum + s.durationMinutes * 60, 0)
    const totalTimeMinutes = recipe.steps.reduce((sum, s) => sum + s.durationMinutes, 0)

    const handleStart = () => {
        if (hasOtherActiveSession) {
            setSnackbar({ open: true, message: '⚠️ Another session is already active!' })
            return
        }

        dispatch(startSession({ recipeId: id, totalDurationSec }))
        const firstStepDurationSec = recipe.steps[0].durationMinutes * 60
        dispatch(initializeStep({ recipeId: id, stepDurationSec: firstStepDurationSec }))
    }

    const handlePause = () => {
        dispatch(pauseSession(id))
    }

    const handleResume = () => {
        dispatch(resumeSession(id))
    }

    const handleStop = () => {
        dispatch(stopCurrentStep(id))

        const isLastStep = session && session.currentStepIndex === recipe.steps.length - 1
        if (isLastStep) {
            setSnackbar({ open: true, message: '⏹️ Step ended. Recipe completed!' })
        } else {
            setSnackbar({ open: true, message: '⏹️ Step ended. Moving to next step...' })
        }
    }

    const handleToggleFavorite = () => {
        dispatch(toggleFavorite(id))
        const saved = JSON.parse(localStorage.getItem('recipes:v1') || '[]')
        const updated = saved.map((r: any) => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r))
        localStorage.setItem('recipes:v1', JSON.stringify(updated))
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <RecipeHeader recipe={recipe} totalTime={totalTimeMinutes} onToggleFavorite={handleToggleFavorite} />

            {session && (
                <>
                    <ActiveStepPanel
                        step={recipe.steps[session.currentStepIndex]}
                        stepIndex={session.currentStepIndex}
                        totalSteps={recipe.steps.length}
                        stepRemainingSec={session.stepRemainingSec}
                        stepDurationSec={recipe.steps[session.currentStepIndex].durationMinutes * 60}
                        ingredients={recipe.ingredients}
                    />

                    <ControlButtons
                        sessionStarted={true}
                        isRunning={session.isRunning}
                        onStart={handleStart}
                        onPause={handlePause}
                        onResume={handleResume}
                        onStop={handleStop}
                    />

                    <Timeline steps={recipe.steps} currentStepIndex={session.currentStepIndex} />

                    <OverallProgress
                        overallRemainingSec={session.overallRemainingSec}
                        totalDurationSec={totalDurationSec}
                    />
                </>
            )}

            {!session && (
                <ControlButtons
                    sessionStarted={false}
                    isRunning={false}
                    onStart={handleStart}
                    onPause={handlePause}
                    onResume={handleResume}
                    onStop={handleStop}
                />
            )}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="info" variant="filled">
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    )
}