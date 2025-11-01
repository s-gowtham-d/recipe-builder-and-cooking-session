import { Routes, Route } from 'react-router-dom'
import Recipes from './pages/Recipes'
import Create from './pages/Create'
import Cook from './pages/Cook'
import NotFound from './pages/NoteFound'
import { Box } from '@mui/material'
import MiniPlayer from './components/MiniPlayer/MiniPlayer'
import { useAppSelector, useAppDispatch } from './app/hooks'
import { tickSecond, advanceStep, endSession } from './features/sessionSlice'
import { useEffect } from 'react'


function App() {
  const dispatch = useAppDispatch()
  const activeRecipeId = useAppSelector((state) => state.session.activeRecipeId)
  const session = useAppSelector((state) =>
    activeRecipeId ? state.session.byRecipeId[activeRecipeId] : null
  )
  const recipe = useAppSelector((state) =>
    state.recipes.items.find((r) => r.id === activeRecipeId)
  )

  useEffect(() => {
    if (!activeRecipeId || !session?.isRunning) return

    const interval = setInterval(() => {
      dispatch(tickSecond(activeRecipeId))
    }, 1000)

    return () => clearInterval(interval)
  }, [activeRecipeId, session?.isRunning, dispatch])

  useEffect(() => {
    if (!activeRecipeId || !recipe || !session) return
    if (session.stepRemainingSec > 0) return

    if (session.currentStepIndex >= recipe.steps.length) {
      dispatch(endSession(activeRecipeId))
      return
    }

    const isLastStep = session.currentStepIndex === recipe.steps.length - 1

    if (isLastStep) {
      dispatch(endSession(activeRecipeId))
    } else {
      const nextStepIndex = session.currentStepIndex + 1
      if (nextStepIndex < recipe.steps.length) {
        const nextStep = recipe.steps[nextStepIndex]
        const nextStepDurationSec = nextStep.durationMinutes * 60
        dispatch(advanceStep({ recipeId: activeRecipeId, nextStepDurationSec }))
      }
    }
  }, [activeRecipeId, recipe, session, dispatch])

  return (
    <Box >
      <Routes>
        <Route path="/" element={<Recipes />} />
        <Route path="/create" element={<Create />} />
        <Route path="/cook/:id" element={<Cook />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <MiniPlayer />
    </Box>
  )
}

export default App
