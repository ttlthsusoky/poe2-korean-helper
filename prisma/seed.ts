import { PrismaClient, SiteCategory, FeedbackType } from '@prisma/client'

const prisma = new PrismaClient()

// 게임 용어 데이터
const gameTermsData = [
  // 기본 능력치
  { english: 'Strength', korean: '힘', category: 'stats' },
  { english: 'Dexterity', korean: '민첩성', category: 'stats' },
  { english: 'Intelligence', korean: '지능', category: 'stats' },
  
  // 방어 관련
  { english: 'Life', korean: '생명력', category: 'defense' },
  { english: 'Mana', korean: '마나', category: 'defense' },
  { english: 'Energy Shield', korean: '에너지 보호막', category: 'defense' },
  { english: 'Armor', korean: '방어도', category: 'defense' },
  { english: 'Armour', korean: '방어도', category: 'defense' },
  { english: 'Evasion', korean: '회피', category: 'defense' },
  { english: 'Block', korean: '막기', category: 'defense' },
  { english: 'Resistance', korean: '저항', category: 'defense' },
  { english: 'Fire Resistance', korean: '화염 저항', category: 'defense' },
  { english: 'Cold Resistance', korean: '냉기 저항', category: 'defense' },
  { english: 'Lightning Resistance', korean: '번개 저항', category: 'defense' },
  { english: 'Chaos Resistance', korean: '카오스 저항', category: 'defense' },
  
  // 피해 관련
  { english: 'Damage', korean: '피해', category: 'damage' },
  { english: 'Physical Damage', korean: '물리 피해', category: 'damage' },
  { english: 'Fire Damage', korean: '화염 피해', category: 'damage' },
  { english: 'Cold Damage', korean: '냉기 피해', category: 'damage' },
  { english: 'Lightning Damage', korean: '번개 피해', category: 'damage' },
  { english: 'Chaos Damage', korean: '카오스 피해', category: 'damage' },
  { english: 'Critical Strike', korean: '치명타', category: 'damage' },
  { english: 'Critical Strike Chance', korean: '치명타 확률', category: 'damage' },
  { english: 'Critical Strike Multiplier', korean: '치명타 배수', category: 'damage' },
  { english: 'Attack Speed', korean: '공격 속도', category: 'damage' },
  { english: 'Cast Speed', korean: '시전 속도', category: 'damage' },
  { english: 'Movement Speed', korean: '이동 속도', category: 'damage' },
  
  // 아이템 관련
  { english: 'Weapon', korean: '무기', category: 'items' },
  { english: 'Shield', korean: '방패', category: 'items' },
  { english: 'Helmet', korean: '투구', category: 'items' },
  { english: 'Body Armour', korean: '갑옷', category: 'items' },
  { english: 'Gloves', korean: '장갑', category: 'items' },
  { english: 'Boots', korean: '신발', category: 'items' },
  { english: 'Belt', korean: '허리띠', category: 'items' },
  { english: 'Amulet', korean: '목걸이', category: 'items' },
  { english: 'Ring', korean: '반지', category: 'items' },
  { english: 'Flask', korean: '플라스크', category: 'items' },
  { english: 'Gem', korean: '젬', category: 'items' },
  { english: 'Support Gem', korean: '서포트 젬', category: 'items' },
  { english: 'Skill Gem', korean: '스킬 젬', category: 'items' },
  { english: 'Socket', korean: '홈', category: 'items' },
  { english: 'Link', korean: '연결', category: 'items' }
]

// 사이트 데이터
const sitesData = [
  {
    name: 'POE2DB',
    url: 'https://poe2db.tw/',
    description: '아이템, 스킬, 패시브 트리 종합 데이터베이스',
    category: 'DATABASE' as SiteCategory,
    korean: true,
    featured: true,
    tags: ['database', 'items', 'skills']
  },
  {
    name: 'POE2 Ninja',
    url: 'https://poe2.ninja/',
    description: '아이템 시세, 경제 정보, 빌드 통계',
    category: 'ECONOMY' as SiteCategory,
    korean: false,
    featured: true,
    tags: ['economy', 'prices', 'builds']
  },
  {
    name: 'Maxroll POE2',
    url: 'https://maxroll.gg/poe2',
    description: '전문가 빌드 가이드, 리그 시작 가이드',
    category: 'GUIDE' as SiteCategory,
    korean: false,
    featured: true,
    tags: ['guides', 'builds', 'leveling']
  },
  {
    name: 'POE2 Way',
    url: 'https://www.poe2way.com/',
    description: '액트 진행 가이드, 퀘스트 공략',
    category: 'GUIDE' as SiteCategory,
    korean: false,
    featured: false,
    tags: ['guides', 'leveling', 'quests']
  },
  {
    name: 'Reddit POE2',
    url: 'https://www.reddit.com/r/PathOfExile2/',
    description: 'POE2 전용 레딧 커뮤니티, 최신 소식과 토론',
    category: 'COMMUNITY' as SiteCategory,
    korean: false,
    featured: false,
    tags: ['community', 'news', 'discussion']
  },
  {
    name: 'POE 코리아 카페',
    url: 'https://cafe.naver.com/poekorea',
    description: '한국 최대 POE 커뮤니티 (네이버 카페)',
    category: 'COMMUNITY' as SiteCategory,
    korean: true,
    featured: true,
    tags: ['community', 'korean', 'forum']
  }
]

// 크리에이터 데이터
const creatorsData = [
  {
    name: '세기말게이머',
    channel: '@apocalypsegamer',
    description: 'POE 초보자부터 고수까지, 꼼꼼한 설명',
    platform: 'youtube',
    korean: true,
    featured: true
  },
  {
    name: '아이작케이',
    channel: '@isaacK',
    description: 'POE 빌드 리뷰 및 파밍 가이드',
    platform: 'youtube',
    korean: true,
    featured: true
  },
  {
    name: 'Zizaran',
    channel: '@ZizaranTV',
    description: '세계 최고 POE 스트리머, 신시즌 가이드',
    platform: 'youtube',
    korean: false,
    featured: true,
    subscribers: 500000
  },
  {
    name: 'Mathil',
    channel: '@Mathil1',
    description: '창의적인 빌드 제작자',
    platform: 'youtube',
    korean: false,
    featured: true,
    subscribers: 300000
  }
]

async function main() {
  console.log('시드 데이터 생성 시작...')

  // 게임 용어 생성
  console.log('게임 용어 생성 중...')
  for (const term of gameTermsData) {
    await prisma.gameTerm.upsert({
      where: { english: term.english },
      update: term,
      create: term,
    })
  }

  // 사이트 생성
  console.log('사이트 데이터 생성 중...')
  for (const site of sitesData) {
    const existingSite = await prisma.site.findFirst({
      where: { url: site.url }
    })
    
    if (!existingSite) {
      await prisma.site.create({
        data: site
      })
    }
  }

  // 크리에이터 생성
  console.log('크리에이터 데이터 생성 중...')
  for (const creator of creatorsData) {
    const existingCreator = await prisma.creator.findFirst({
      where: { channel: creator.channel }
    })
    
    if (!existingCreator) {
      await prisma.creator.create({
        data: creator
      })
    }
  }

  // 앱 설정 생성
  console.log('앱 설정 생성 중...')
  await prisma.appSetting.upsert({
    where: { key: 'translation_enabled' },
    update: { value: 'true' },
    create: { key: 'translation_enabled', value: 'true' },
  })

  await prisma.appSetting.upsert({
    where: { key: 'app_version' },
    update: { value: '1.0.0' },
    create: { key: 'app_version', value: '1.0.0' },
  })

  console.log('시드 데이터 생성 완료!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })