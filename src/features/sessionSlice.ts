import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface SessionData {
    currentStepIndex: number
    isRunning: boolean
    stepRemainingSec: number
    overallRemainingSec: number
    lastTickTs?: number
}

interface SessionState {
    activeRecipeId: string | null
    byRecipeId: Record<string, SessionData>
}

const initialState: SessionState = {
    activeRecipeId: null,
    byRecipeId: {}
}

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        startSession: (state, action: PayloadAction<{ recipeId: string; totalDurationSec: number }>) => {
            const { recipeId, totalDurationSec } = action.payload
            state.activeRecipeId = recipeId
            state.byRecipeId[recipeId] = {
                currentStepIndex: 0,
                isRunning: true,
                stepRemainingSec: 0,
                overallRemainingSec: totalDurationSec,
                lastTickTs: Date.now()
            }
        },
        initializeStep: (state, action: PayloadAction<{ recipeId: string; stepDurationSec: number }>) => {
            const { recipeId, stepDurationSec } = action.payload
            const session = state.byRecipeId[recipeId]
            if (session) {
                session.stepRemainingSec = stepDurationSec
                session.lastTickTs = Date.now()
            }
        },
        tickSecond: (state, action: PayloadAction<string>) => {
            const recipeId = action.payload
            const session = state.byRecipeId[recipeId]
            if (!session || !session.isRunning) return

            const now = Date.now()
            const delta = session.lastTickTs ? Math.floor((now - session.lastTickTs) / 1000) : 1

            session.stepRemainingSec = Math.max(0, session.stepRemainingSec - delta)
            session.overallRemainingSec = Math.max(0, session.overallRemainingSec - delta)
            session.lastTickTs = now
        },
        pauseSession: (state, action: PayloadAction<string>) => {
            const session = state.byRecipeId[action.payload]
            if (session) {
                session.isRunning = false
            }
        },
        resumeSession: (state, action: PayloadAction<string>) => {
            const session = state.byRecipeId[action.payload]
            if (session) {
                session.isRunning = true
                session.lastTickTs = Date.now()
            }
        },
        advanceStep: (state, action: PayloadAction<{ recipeId: string; nextStepDurationSec: number }>) => {
            const { recipeId, nextStepDurationSec } = action.payload
            const session = state.byRecipeId[recipeId]
            if (session) {
                session.currentStepIndex += 1
                session.stepRemainingSec = nextStepDurationSec
                session.isRunning = true
                session.lastTickTs = Date.now()
            }
        },
        stopCurrentStep: (state, action: PayloadAction<string>) => {
            const session = state.byRecipeId[action.payload]
            if (session) {
                session.overallRemainingSec -= session.stepRemainingSec
                session.stepRemainingSec = 0
                session.overallRemainingSec = Math.max(0, session.overallRemainingSec - session.stepRemainingSec)
            }
        },
        endSession: (state, action: PayloadAction<string>) => {
            const recipeId = action.payload
            delete state.byRecipeId[recipeId]
            if (state.activeRecipeId === recipeId) {
                state.activeRecipeId = null
            }
        }
    }
})

export const {
    startSession,
    initializeStep,
    tickSecond,
    pauseSession,
    resumeSession,
    advanceStep,
    stopCurrentStep,
    endSession
} = sessionSlice.actions

export default sessionSlice.reducer
