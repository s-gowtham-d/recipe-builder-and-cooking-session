import { Paper, Box, Typography, LinearProgress } from '@mui/material'

interface OverallProgressProps {
    overallRemainingSec: number
    totalDurationSec: number
}

export default function OverallProgress({ overallRemainingSec, totalDurationSec }: OverallProgressProps) {
    const overallElapsedSec = totalDurationSec - overallRemainingSec
    const overallProgressPercent = Math.round((overallElapsedSec / totalDurationSec) * 100)
    const minutes = Math.floor(overallRemainingSec / 60)
    const seconds = overallRemainingSec % 60

    return (
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                Overall Progress
            </Typography>
            <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        Overall remaining: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" color="primary">
                        {overallProgressPercent}%
                    </Typography>
                </Box>
                <LinearProgress
                    variant="determinate"
                    value={overallProgressPercent}
                    sx={{ height: 10, borderRadius: 1 }}
                    aria-valuenow={overallProgressPercent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                />
            </Box>
        </Paper>
    )
}