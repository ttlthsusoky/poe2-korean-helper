import { NextRequest, NextResponse } from 'next/server'

// GET /api/terms - 게임 용어 번역 조회
// 더미 게임 용어 데이터 (DB 연결 실패 시 사용)
const dummyTerms = [
  // 클래스
  { english: 'Witch', korean: '위치', category: 'class' },
  { english: 'Monk', korean: '몽크', category: 'class' },
  { english: 'Ranger', korean: '레인저', category: 'class' },
  { english: 'Warrior', korean: '워리어', category: 'class' },
  { english: 'Sorceress', korean: '소서리스', category: 'class' },
  { english: 'Mercenary', korean: '용병', category: 'class' },
  
  // 스킬 관련
  { english: 'Skill', korean: '스킬', category: 'skill' },
  { english: 'Passive', korean: '패시브', category: 'skill' },
  { english: 'Active', korean: '액티브', category: 'skill' },
  { english: 'Support Gem', korean: '서포트 젬', category: 'skill' },
  { english: 'Spirit Gem', korean: '스피릿 젬', category: 'skill' },
  { english: 'Mana', korean: '마나', category: 'attribute' },
  { english: 'Energy Shield', korean: '에너지 실드', category: 'attribute' },
  { english: 'Life', korean: '생명력', category: 'attribute' },
  
  // 아이템
  { english: 'Weapon', korean: '무기', category: 'item' },
  { english: 'Armor', korean: '방어구', category: 'item' },
  { english: 'Unique', korean: '유니크', category: 'rarity' },
  { english: 'Rare', korean: '레어', category: 'rarity' },
  { english: 'Magic', korean: '매직', category: 'rarity' },
  { english: 'Normal', korean: '일반', category: 'rarity' },
  { english: 'Currency', korean: '커런시', category: 'item' },
  
  // 게임 메커닉
  { english: 'Ascendancy', korean: '승급', category: 'mechanic' },
  { english: 'Atlas', korean: '아틀라스', category: 'mechanic' },
  { english: 'Endgame', korean: '엔드게임', category: 'mechanic' },
  { english: 'Mapping', korean: '맵핑', category: 'mechanic' },
  { english: 'Boss', korean: '보스', category: 'mechanic' },
  { english: 'Build', korean: '빌드', category: 'mechanic' },
  
  // 추가 용어들
  { english: 'Flask', korean: '플라스크', category: 'item' },
  { english: 'Gem', korean: '젬', category: 'item' },
  { english: 'Socket', korean: '소켓', category: 'mechanic' },
  { english: 'Link', korean: '연결', category: 'mechanic' },
  { english: 'Critical Strike', korean: '치명타', category: 'mechanic' },
  { english: 'Damage', korean: '피해', category: 'attribute' },
  { english: 'Resistance', korean: '저항', category: 'attribute' },
  { english: 'Attack Speed', korean: '공격 속도', category: 'attribute' },
  { english: 'Cast Speed', korean: '시전 속도', category: 'attribute' },
  { english: 'Movement Speed', korean: '이동 속도', category: 'attribute' }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    
    let terms;
    let isDatabaseAvailable = true;
    
    // 더미 데이터만 사용
    isDatabaseAvailable = false
    terms = dummyTerms
    
    if (category && category !== 'all') {
      terms = terms.filter(term => term.category === category)
    }
    
    if (search) {
      const searchLower = search.toLowerCase()
      terms = terms.filter(term => 
        term.english.toLowerCase().includes(searchLower) ||
        term.korean.includes(search)
      )
    }

    // 클라이언트에서 사용하기 쉽도록 객체 형태로도 제공
    const termsObject = terms.reduce((acc: any, term: any) => {
      acc[term.english] = term.korean
      return acc
    }, {} as Record<string, string>)

    return NextResponse.json({
      success: true,
      data: {
        terms,
        termsObject,
        count: terms.length,
        source: isDatabaseAvailable ? 'database' : 'dummy'
      }
    })
  } catch (error) {
    console.error('게임 용어 조회 에러:', error)
    return NextResponse.json({
      success: false,
      error: '게임 용어를 불러올 수 없습니다.'
    }, { status: 500 })
  }
}

// POST /api/terms - 새 게임 용어 추가 (관리자용) - 비활성화됨
export async function POST(request: NextRequest) {
  return NextResponse.json({
    success: false,
    error: '데이터베이스가 연결되지 않았습니다.'
  }, { status: 500 })
}