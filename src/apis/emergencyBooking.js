import { Api } from './api'

export const postScore = async (score) => {
    const response = await Api().post(`emergency-slots/score`, { 
        score: score 
    })
    return response.data
}