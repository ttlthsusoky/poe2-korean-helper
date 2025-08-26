import axios from 'axios'

// API 클라이언트 설정
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000/api',
  timeout: 10000,
})

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

// 사이트 관련 API
export const sitesApi = {
  // 사이트 목록 조회
  async getSites(params?: {
    category?: string
    search?: string
    featured?: boolean
  }) {
    const response = await api.get('/sites', { params })
    return response.data
  },

  // 사이트 클릭 기록
  async recordClick(siteId: number) {
    const response = await api.post(`/sites/${siteId}/click`)
    return response.data
  }
}

// 크리에이터 관련 API
export const creatorsApi = {
  // 크리에이터 목록 조회
  async getCreators(params?: {
    korean?: boolean
    featured?: boolean
    platform?: string
  }) {
    const response = await api.get('/creators', { params })
    return response.data
  }
}

// 게임 용어 관련 API
export const termsApi = {
  // 게임 용어 조회
  async getTerms(params?: {
    category?: string
    search?: string
  }) {
    const response = await api.get('/terms', { params })
    return response.data
  }
}

// 피드백 관련 API
export const feedbackApi = {
  // 피드백 제출
  async submitFeedback(data: {
    type: 'BUG_REPORT' | 'FEATURE_REQUEST' | 'SITE_SUGGESTION' | 'GENERAL'
    title: string
    content: string
    email?: string
  }) {
    const response = await api.post('/feedback', data)
    return response.data
  }
}

// 헬스체크 API
export const healthApi = {
  async check() {
    const response = await api.get('/health')
    return response.data
  }
}

export default api