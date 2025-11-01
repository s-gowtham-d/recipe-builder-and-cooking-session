import { Stack, Button } from '@mui/material'
import { PlayArrow, Pause, Stop } from '@mui/icons-material'

interface ControlButtonsProps {
    sessionStarted: boolean
    isRunning: boolean
    onStart: () => void
    onPause: () => void
    onResume: () => void
    onStop: () => void
}

export default function ControlButtons({
    sessionStarted,
    isRunning,
    onStart,
    onPause,
    onResume,
    onStop
}: ControlButtonsProps) {
    if (!sessionStarted) {
        return (
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
                <Button
                    variant="contained"
                    size="large"
                    startIcon={<PlayArrow />}
                    onClick={onStart}
                    sx={{ px: 6, py: 1.5, borderRadius: 3, fontSize: '1.1rem' }}
                >
                    Start Session
                </Button>
            </Stack>
        )
    }

    return (
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
            {isRunning ? (
                <Button
                    variant="contained"
                    size="large"
                    startIcon={<Pause />}
                    onClick={onPause}
                    color="warning"
                    sx={{ px: 4, py: 1.5, borderRadius: 3 }}
                >
                    Pause
                </Button>
            ) : (
                <Button
                    variant="contained"
                    size="large"
                    startIcon={<PlayArrow />}
                    onClick={onResume}
                    color="success"
                    sx={{ px: 4, py: 1.5, borderRadius: 3 }}
                >
                    Resume
                </Button>
            )}
            <Button
                variant="outlined"
                size="large"
                startIcon={<Stop />}
                onClick={onStop}
                color="error"
                sx={{ px: 4, py: 1.5, borderRadius: 3 }}
            >
                Stop
            </Button>
        </Stack>
    )
}
