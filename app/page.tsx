'use client'

import { useState, useEffect } from 'react'
import { Search, Globe, Book, Zap, Star, MessageSquare, TrendingUp, MessageCircle, Palette } from 'lucide-react'
import FeedbackModal from './components/FeedbackModal'
import { sitesApi, termsApi } from '../lib/api'

interface Site {
  id: number
  name: string
  url: string
  description: string
  category: string
  korean: boolean
  featured: boolean
  clickCount: number
  tags: string[]
}

// Creator 인터페이스 제거 - 유튜버 섹션 없음

// 게임 용어 전역 변수
let gameTerms: Record<string, string> = {}

export default function HomePage() {
  // 실제 POE2 사이트 데이터 (시드 데이터와 동일)
  const realSites: Site[] = [
    {
      id: 1,
      name: 'POE2DB',
      url: 'https://poe2db.tw/',
      description: '아이템과 스킬, 패시브 트리 종합 데이터베이스',
      category: 'DATABASE',
      korean: true,
      featured: true,
      clickCount: 1250,
      tags: ['database', 'items', 'skills']
    },
    {
      id: 2,
      name: 'POE2 Ninja',
      url: 'https://poe2.ninja/',
      description: '시세와 빌드통계, 엔드게임 정보',
      category: 'TOOL',
      korean: false,
      featured: true,
      clickCount: 2890,
      tags: ['economy', 'prices', 'builds']
    },
    {
      id: 3,
      name: 'Maxroll POE2',
      url: 'https://maxroll.gg/poe2',
      description: '빌드가이드와 아틀라스 패시브, 맵핑 전략',
      category: 'GUIDE',
      korean: false,
      featured: true,
      clickCount: 1890,
      tags: ['guides', 'builds', 'leveling']
    },
    {
      id: 4,
      name: 'POE2 Way',
      url: 'https://www.poe2way.com/',
      description: '액트가이드, 공략 및 가이드',
      category: 'GUIDE',
      korean: false,
      featured: false,
      clickCount: 945,
      tags: ['guides', 'leveling', 'quests']
    },
    {
      id: 5,
      name: 'Reddit POE2',
      url: 'https://www.reddit.com/r/PathOfExile2/',
      description: 'POE2 전용 레딧 커뮤니티',
      category: 'COMMUNITY',
      korean: false,
      featured: false,
      clickCount: 1543,
      tags: ['community', 'news', 'discussion']
    },
    {
      id: 6,
      name: 'POE 코리아 카페',
      url: 'https://cafe.naver.com/poekorea',
      description: '한국 POE 커뮤니티, 빌드 공유 및 거래',
      category: 'COMMUNITY',
      korean: true,
      featured: true,
      clickCount: 2145,
      tags: ['community', 'korean', 'forum']
    },
    {
      id: 7,
      name: 'Path of Building',
      url: 'https://pathofbuilding.community/',
      description: '빌드 계획과 DPS 계산을 위한 필수 도구',
      category: 'TOOL',
      korean: false,
      featured: true,
      clickCount: 1678,
      tags: ['build', 'planning', 'calculator']
    },
    {
      id: 8,
      name: 'Craft of Exile',
      url: 'https://www.craftofexile.com/',
      description: '아이템 제작 시뮬레이터 및 가격 추정 도구',
      category: 'TOOL',
      korean: false,
      featured: true,
      clickCount: 892,
      tags: ['crafting', 'simulator', 'prices']
    },
    {
      id: 9,
      name: 'Filterblade',
      url: 'https://filterblade.xyz/',
      description: '아이템 필터 제작 및 관리 도구',
      category: 'TOOL',
      korean: false,
      featured: false,
      clickCount: 567,
      tags: ['filter', 'items', 'customization']
    },
    {
      id: 10,
      name: 'POE2Skills.com',
      url: 'https://poe2skills.com/',
      description: 'POE2 전체 스킬 정보 데이터베이스',
      category: 'DATABASE',
      korean: false,
      featured: false,
      clickCount: 456,
      tags: ['skills', 'database', 'reference']
    },
    {
      id: 13,
      name: 'Mobalytics POE2',
      url: 'https://mobalytics.gg/poe2/',
      description: '최신 POE2 빌드와 상세 가이드, 메타 분석',
      category: 'GUIDE',
      korean: false,
      featured: true,
      clickCount: 1123,
      tags: ['builds', 'guides', 'meta']
    },
    {
      id: 14,
      name: 'POE2 공식 포럼',
      url: 'https://www.pathofexile.com/forum',
      description: 'Path of Exile 공식 커뮤니티 포럼',
      category: 'COMMUNITY',
      korean: false,
      featured: false,
      clickCount: 678,
      tags: ['official', 'forum', 'community']
    }
  ];

  const [sites, setSites] = useState<Site[]>(realSites)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [translationMode, setTranslationMode] = useState(true)
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)
  const [isLoadingTerms, setIsLoadingTerms] = useState(true)
  const [termsError, setTermsError] = useState<string | null>(null)

  const categories = [
    { id: 'all', name: '전체', icon: Globe },
    { id: 'DATABASE', name: '데이터베이스', icon: Book },
    { id: 'GUIDE', name: '가이드', icon: Star },
    { id: 'TOOL', name: '도구', icon: Zap },
    { id: 'ECONOMY', name: '경제정보', icon: TrendingUp },
    { id: 'COMMUNITY', name: '커뮤니티', icon: MessageCircle },
  ]

  // 데이터 로드
  useEffect(() => {
    const loadGameTerms = async () => {
      try {
        setIsLoadingTerms(true)
        setTermsError(null)
        const response = await termsApi.getTerms()
        if (response.success && response.data.termsObject) {
          gameTerms = response.data.termsObject
          console.log(`게임 용어 로딩 완료: ${response.data.count}개 (소스: ${response.data.source})`)
        } else {
          throw new Error('Invalid API response')
        }
      } catch (error) {
        console.error('게임 용어 로딩 실패:', error)
        setTermsError('게임 용어를 불러오는데 실패했습니다. 더미 데이터를 사용합니다.')
        // 실패하면 더미 데이터 사용
        gameTerms = getDummyTerms()
      } finally {
        setIsLoadingTerms(false)
      }
    }

    loadGameTerms()
  }, [])

  // 더미 게임 용어 데이터
  const getDummyTerms = (): Record<string, string> => {
    return {
      // 클래스
      'Witch': '위치',
      'Monk': '몽크', 
      'Ranger': '레인저',
      'Warrior': '워리어',
      'Sorceress': '소서리스',
      'Mercenary': '용병',
      
      // 스킬 관련
      'Skill': '스킬',
      'Passive': '패시브',
      'Active': '액티브',
      'Support Gem': '서포트 젬',
      'Spirit Gem': '스피릿 젬',
      'Mana': '마나',
      'Energy Shield': '에너지 실드',
      'Life': '생명력',
      
      // 아이템
      'Weapon': '무기',
      'Armor': '방어구',
      'Unique': '유니크',
      'Rare': '레어',
      'Magic': '매직',
      'Normal': '일반',
      'Currency': '커런시',
      
      // 게임 메커닉
      'Ascendancy': '승급',
      'Atlas': '아틀라스',
      'Endgame': '엔드게임',
      'Mapping': '맵핑',
      'Boss': '보스',
      'Build': '빌드'
    }
  }

  // 사이트 필터링
  const filteredSites = sites.filter(site => {
    const matchesCategory = selectedCategory === 'all' || site.category === selectedCategory
    const matchesSearch = site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         site.description.includes(searchTerm)
    return matchesCategory && matchesSearch
  })

  // 더미 데이터만 사용하므로 로딩 없음
  const loading = false

  // 게임 용어 번역
  const translateText = (text: string) => {
    if (!translationMode) return text
    
    let translatedText = text
    
    // 더 긴 용어부터 먼저 번역
    const sortedTerms = Object.entries(gameTerms).sort(([a], [b]) => b.length - a.length)
    
    sortedTerms.forEach(([english, korean]) => {
      const regex = new RegExp(`\\b${english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
      translatedText = translatedText.replace(regex, `${korean}(${english})`)
    })
    
    return translatedText
  }

  // 사이트 클릭 처리
  const handleSiteClick = async (site: Site) => {
    try {
      // 클릭 통계 기록
      await sitesApi.recordClick(site.id)
      // 바로 이동
      window.open(site.url, '_blank')
    } catch (error) {
      console.error('클릭 기록 실패:', error)
      // 실패해도 사이트는 이동
      window.open(site.url, '_blank')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-poe-darker via-poe-dark/50 to-poe-brown/30">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-poe-darker/95 backdrop-blur-md border-b border-poe-gold/40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-poe-gold">
              poe2헬퍼
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFeedbackModalOpen(true)}
                className="px-4 py-3 bg-poe-brown/50 text-poe-light border border-poe-gold/30 hover:border-poe-gold/50 rounded-lg text-base font-semibold transition-all duration-300 flex items-center gap-2 min-h-[48px]"
              >
                <MessageSquare className="w-5 h-5" />
                <span className="hidden sm:inline">피드백</span>
              </button>
              <button
                onClick={() => setTranslationMode(!translationMode)}
                disabled={isLoadingTerms}
                className={`px-3 py-3 rounded-lg text-sm font-semibold transition-all duration-300 min-h-[48px] disabled:opacity-50 disabled:cursor-not-allowed ${
                  translationMode 
                    ? 'bg-poe-gold text-poe-dark shadow-lg' 
                    : 'bg-poe-brown/50 text-poe-light border border-poe-gold/30 hover:border-poe-gold/50'
                }`}
                title={isLoadingTerms 
                  ? '게임 용어 로딩 중...' 
                  : translationMode 
                    ? 'POE2 용어를 한글로 번역 표시 중' 
                    : 'POE2 용어 번역 기능 꺼짐'
                }
              >
                {isLoadingTerms ? '로딩...' : translationMode ? '한글' : '영문'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* 에러 알림 */}
        {termsError && (
          <div className="mb-4 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg text-orange-300 text-sm">
            ⚠️ {termsError}
          </div>
        )}

        {/* 검색 바 - 모바일 최적화 */}
        <div className="mb-6">
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="사이트나 도구 검색..."
              className="w-full pl-12 pr-4 py-4 bg-poe-brown/30 border border-poe-gold/30 rounded-xl text-poe-light text-lg placeholder-poe-light/50 focus:outline-none focus:border-poe-gold focus:ring-2 focus:ring-poe-gold/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* 카테고리 필터 - 모바일 최적화 */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map(category => {
            const IconComponent = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-colors min-h-[48px] ${
                  selectedCategory === category.id
                    ? 'bg-poe-gold text-poe-dark shadow-lg'
                    : 'bg-poe-brown/50 text-poe-light hover:bg-poe-brown border border-poe-gold/20'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="text-base font-medium">{category.name}</span>
              </button>
            )
          })}
        </div>

        {/* 유용한 사이트들 */}
        {(
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-poe-gold mb-6 flex items-center gap-2">
              <Globe className="w-6 h-6" />
              POE2 유용한 사이트들
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredSites.map((site) => (
                <div 
                  key={site.id} 
                  className="bg-poe-brown/40 border border-poe-gold/20 rounded-xl p-6 hover:shadow-xl hover:border-poe-gold/40 transition-all cursor-pointer active:scale-95 min-h-[140px] touch-manipulation"
                  onClick={() => handleSiteClick(site)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-poe-gold leading-tight flex-1">{site.name}</h3>
                    {site.featured && (
                      <span className="text-sm bg-poe-gold text-poe-dark px-3 py-1 rounded-full font-bold shadow-md ml-2 flex-shrink-0">
                        추천
                      </span>
                    )}
                  </div>
                  <p className="text-poe-light/90 mb-5 text-base sm:text-lg leading-relaxed">
                    {translateText(site.description)}
                  </p>
                  <div className="flex items-center justify-between text-base text-poe-light/70">
                    <span className="text-poe-light/60">방문: {site.clickCount}회</span>
                    <span className="text-poe-gold font-semibold">탭하여 이동 →</span>
                  </div>
                </div>
              ))}
            </div>

            {filteredSites.length === 0 && !loading && (
              <div className="text-center py-8">
                <p className="text-poe-light/60">검색 결과가 없습니다.</p>
              </div>
            )}
          </section>
        )}


      </div>

      {/* 푸터 */}
      <footer className="bg-poe-darker/90 border-t border-poe-gold/30 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-poe-light/70 text-sm font-medium">
            게임 헬퍼 - PoE2 커뮤니티를 위한 비공식 도구
          </p>
          <p className="text-poe-light/50 text-xs mt-2">
            🌐 게임용어 번역: {isLoadingTerms 
              ? '로딩 중...' 
              : `${Object.keys(gameTerms).length}개 용어 ${translationMode ? '활성' : '비활성'}`
            }
          </p>
          <p className="text-poe-light/40 text-xs mt-1">
            비공식 앱입니다. Grinding Gear Games와 무관하며, 모든 콘텐츠는 해당 사이트의 저작물입니다.
          </p>
          <p className="text-poe-light/30 text-xs mt-1">
            ⚠️ 이 앱은 커뮤니티 도구로, 공식 게임사와 관련이 없습니다.
          </p>
        </div>
      </footer>

      {/* 피드백 모달 */}
      <FeedbackModal 
        isOpen={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
      />
    </div>
  )
}