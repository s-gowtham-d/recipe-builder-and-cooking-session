import { Paper, Box, Typography, IconButton, CircularProgress, Chip } from '@mui/material'
import { PlayArrow, Pause, Stop } from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { pauseSession, resumeSession, stopCurrentStep } from '../../features/sessionSlice'

export default function MiniPlayer() {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useAppDispatch()

    const activeRecipeId = useAppSelector((state) => state.session.activeRecipeId)
    const session = useAppSelector((state) =>
        activeRecipeId ? state.session.byRecipeId[activeRecipeId] : null
    )
    const recipe = useAppSelector((state) =>
        state.recipes.items.find((r) => r.id === activeRecipeId)
    )

    if (!activeRecipeId || !session || !recipe) return null
    if (location.pathname === `/cook/${activeRecipeId}`) return null

    const currentStep = recipe.steps[session.currentStepIndex]
    const stepDurationSec = currentStep.durationMinutes * 60
    const stepElapsedSec = Math.max(0, stepDurationSec - session.stepRemainingSec)
    const stepProgressPercent = Math.round((stepElapsedSec / stepDurationSec) * 100)
    const minutes = Math.floor(session.stepRemainingSec / 60)
    const seconds = session.stepRemainingSec % 60

    const handlePauseResume = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (session.isRunning) {
            dispatch(pauseSession(activeRecipeId))
        } else {
            dispatch(resumeSession(activeRecipeId))
        }
    }

    const handleStop = (e: React.MouseEvent) => {
        e.stopPropagation()
        dispatch(stopCurrentStep(activeRecipeId))
    }

    return (
        <Paper
            elevation={8}
            sx={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                width: 360,
                p: 2,
                borderRadius: 3,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 12
                },
                zIndex: 1300
            }}
            onClick={() => navigate(`/cook/${activeRecipeId}`)}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ position: 'relative' }}>
                    <CircularProgress
                        variant="determinate"
                        value={stepProgressPercent}
                        size={56}
                        thickness={4}
                        sx={{ color: currentStep.type === 'cooking' ? 'error.main' : 'info.main' }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Typography variant="caption" fontWeight="bold">
                            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                        </Typography>
                    </Box>
                </Box>

                <Box flex={1}>
                    <Typography variant="subtitle2" fontWeight="bold" noWrap>
                        {recipe.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Step {session.currentStepIndex + 1} of {recipe.steps.length}
                    </Typography>
                    <Box sx={{ mt: 0.5 }}>
                        <Chip
                            label={session.isRunning ? 'Running' : 'Paused'}
                            size="small"
                            color={session.isRunning ? 'success' : 'warning'}
                            sx={{ height: 20, fontSize: '0.7rem' }}
                        />
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton
                        size="small"
                        onClick={handlePauseResume}
                        color={session.isRunning ? 'warning' : 'success'}
                    >
                        {session.isRunning ? <Pause /> : <PlayArrow />}
                    </IconButton>
                    <IconButton size="small" onClick={handleStop} color="error">
                        <Stop />
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    )
}