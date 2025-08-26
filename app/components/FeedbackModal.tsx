'use client'

import { useState } from 'react'
import { X, Send, MessageSquare, Bug, Lightbulb, Globe, User } from 'lucide-react'
import { feedbackApi } from '@/lib/api'

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [formData, setFormData] = useState<{
    type: 'BUG_REPORT' | 'FEATURE_REQUEST' | 'SITE_SUGGESTION' | 'GENERAL'
    title: string
    content: string
    email: string
  }>({
    type: 'GENERAL',
    title: '',
    content: '',
    email: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const feedbackTypes = [
    {
      value: 'GENERAL',
      label: '일반 의견',
      icon: MessageSquare,
      description: '일반적인 의견이나 제안사항'
    },
    {
      value: 'BUG_REPORT',
      label: '버그 신고',
      icon: Bug,
      description: '사이트의 오류나 버그 신고'
    },
    {
      value: 'FEATURE_REQUEST',
      label: '기능 요청',
      icon: Lightbulb,
      description: '새로운 기능에 대한 아이디어'
    },
    {
      value: 'SITE_SUGGESTION',
      label: '사이트 추천',
      icon: Globe,
      description: 'POE2 관련 유용한 사이트 추천'
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await feedbackApi.submitFeedback(formData)
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        onClose()
        // 폼 리셋
        setFormData({
          type: 'GENERAL',
          title: '',
          content: '',
          email: ''
        })
      }, 2000)
    } catch (error) {
      console.error('피드백 제출 실패:', error)
      alert('피드백 제출에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-poe-darker border border-poe-gold/30 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-poe-gold/20">
          <h2 className="text-xl font-bold text-poe-gold flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            피드백 보내기
          </h2>
          <button
            onClick={onClose}
            className="text-poe-light hover:text-poe-gold transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 성공 메시지 */}
        {isSuccess && (
          <div className="p-6 text-center">
            <div className="text-green-400 text-6xl mb-4">✓</div>
            <h3 className="text-lg font-semibold text-poe-gold mb-2">
              피드백이 성공적으로 전송되었습니다!
            </h3>
            <p className="text-poe-light/80">
              소중한 의견 감사합니다. 빠른 시일 내에 검토하겠습니다.
            </p>
          </div>
        )}

        {/* 피드백 폼 */}
        {!isSuccess && (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* 피드백 타입 선택 */}
            <div>
              <label className="block text-poe-gold font-medium mb-3">
                피드백 유형
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {feedbackTypes.map((type) => {
                  const IconComponent = type.icon
                  return (
                    <label
                      key={type.value}
                      className={`cursor-pointer p-3 rounded-lg border-2 transition-all ${
                        formData.type === type.value
                          ? 'border-poe-gold bg-poe-gold/10'
                          : 'border-poe-brown/50 hover:border-poe-gold/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="type"
                        value={type.value}
                        checked={formData.type === type.value}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as 'BUG_REPORT' | 'FEATURE_REQUEST' | 'SITE_SUGGESTION' | 'GENERAL' })}
                        className="sr-only"
                      />
                      <div className="flex items-start gap-2">
                        <IconComponent className="w-5 h-5 text-poe-gold mt-0.5" />
                        <div>
                          <div className="font-medium text-poe-light">{type.label}</div>
                          <div className="text-sm text-poe-light/70">{type.description}</div>
                        </div>
                      </div>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* 제목 */}
            <div>
              <label htmlFor="title" className="block text-poe-gold font-medium mb-2">
                제목 *
              </label>
              <input
                id="title"
                type="text"
                required
                maxLength={200}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-poe-brown/30 border border-poe-gold/30 rounded-lg text-poe-light placeholder-poe-light/50 focus:outline-none focus:border-poe-gold"
                placeholder="간단한 제목을 입력해주세요"
              />
              <div className="text-sm text-poe-light/50 mt-1">
                {formData.title.length}/200
              </div>
            </div>

            {/* 내용 */}
            <div>
              <label htmlFor="content" className="block text-poe-gold font-medium mb-2">
                내용 *
              </label>
              <textarea
                id="content"
                required
                maxLength={5000}
                rows={6}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 bg-poe-brown/30 border border-poe-gold/30 rounded-lg text-poe-light placeholder-poe-light/50 focus:outline-none focus:border-poe-gold resize-none"
                placeholder="자세한 내용을 입력해주세요..."
              />
              <div className="text-sm text-poe-light/50 mt-1">
                {formData.content.length}/5000
              </div>
            </div>

            {/* 이메일 (선택사항) */}
            <div>
              <label htmlFor="email" className="block text-poe-gold font-medium mb-2">
                이메일 (선택사항)
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-poe-brown/30 border border-poe-gold/30 rounded-lg text-poe-light placeholder-poe-light/50 focus:outline-none focus:border-poe-gold"
                placeholder="답변 받을 이메일 (선택사항)"
              />
              <div className="text-sm text-poe-light/60 mt-1">
                답변이 필요한 경우 이메일을 입력해주세요
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-poe-gold/30 text-poe-light rounded-lg hover:border-poe-gold/50 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !formData.title.trim() || !formData.content.trim()}
                className="flex-1 px-6 py-3 bg-poe-gold text-poe-dark font-semibold rounded-lg hover:bg-poe-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-poe-dark/30 border-t-poe-dark rounded-full animate-spin" />
                    전송 중...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    피드백 보내기
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}