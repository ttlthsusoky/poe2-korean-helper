# POE2 한국 가이드 📱

한국인을 위한 Path of Exile 2 통합 도구 - 모바일 PWA 앱

## 🌟 주요 기능

### 📱 Progressive Web App (PWA)
- **네이티브 앱처럼 설치 가능** - iOS, Android 홈화면에 설치
- **오프라인 지원** - 캐시된 데이터로 오프라인에서도 사용 가능
- **푸시 알림** - 새로운 가이드나 업데이트 알림
- **빠른 로딩** - Service Worker를 통한 캐시 최적화

### 🎮 POE2 전용 기능
- **게임 용어 번역** - 60+ 게임 용어 자동 한글 번역 (ON/OFF 가능)
- **유용한 사이트 모음** - POE2DB, Ninja, Maxroll 등 엄선된 사이트들
- **크리에이터 가이드** - 한국/해외 유명 POE2 유튜버 모음
- **카테고리 필터링** - 데이터베이스, 가이드, 도구, 경제정보, 커뮤니티별 분류

### 🤖 자동화 시스템
- **n8n 워크플로우** - Reddit, YouTube 최신 가이드 자동 수집
- **실시간 업데이트** - 새로운 가이드 자동 발견 및 추가
- **데이터 동기화** - 백그라운드에서 자동으로 최신 정보 업데이트

### 💬 피드백 시스템
- **다양한 피드백 타입** - 버그 신고, 기능 요청, 사이트 추천, 일반 의견
- **이메일 알림** (선택사항) - 답변 필요시 이메일 연락
- **관리자 대시보드** - 피드백 관리 및 응답 시스템

## 🏗️ 기술 스택

### Frontend
- **Next.js 14** - React 기반 풀스택 프레임워크
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 유틸리티 퍼스트 CSS 프레임워크
- **PWA** - Progressive Web App 기능

### Backend
- **Next.js API Routes** - 서버리스 API 엔드포인트
- **Prisma** - 타입 안전 ORM
- **PostgreSQL** - 관계형 데이터베이스

### DevOps & 자동화
- **Docker & Docker Compose** - 컨테이너화
- **n8n** - 워크플로우 자동화
- **Redis** - 세션 및 캐시 관리

## 🚀 시작하기

### Docker로 실행 (권장)
```bash
# 저장소 클론
git clone <repository-url>
cd poe2-korean-app

# 환경 변수 설정
cp .env.example .env

# Docker 컨테이너 실행
npm run docker:up
```

### 수동 설치
```bash
# 의존성 설치
npm install

# 데이터베이스 설정
npm run db:generate
npm run db:push
npx prisma db seed

# 개발 서버 실행
npm run dev
```

### 서비스 접근
- **웹 앱**: http://localhost:3000
- **n8n 자동화**: http://localhost:5678
- **데이터베이스**: localhost:5432

## 📱 PWA 설치 방법

### iOS (Safari)
1. Safari에서 사이트 접속
2. 하단 공유 버튼 탭
3. "홈 화면에 추가" 선택

### Android (Chrome)
1. Chrome에서 사이트 접속
2. 상단 메뉴 탭
3. "홈 화면에 추가" 선택

## 🤖 자동화 기능

### Reddit 모니터링
- **실행 주기**: 30분마다
- **기능**: r/PathOfExile2에서 가이드 관련 핫 포스트 수집
- **자동 추가**: 조건에 맞는 포스트를 사이트 목록에 자동 추가

### YouTube 모니터링  
- **실행 주기**: 1시간마다
- **기능**: POE2 관련 최신 가이드 영상 검색
- **언어 감지**: 한국어 콘텐츠 자동 분류
- **크리에이터 관리**: 새로운 크리에이터 자동 발견

## 📝 완성된 기능

- [x] **PWA 앱** - 모바일에서 네이티브 앱처럼 설치 가능
- [x] **풀스택 아키텍처** - API + 데이터베이스 + 자동화
- [x] **게임 용어 번역** - 60+ 용어 지원
- [x] **피드백 시스템** - 완전한 피드백 수집 시스템
- [x] **자동화** - Reddit, YouTube 모니터링
- [x] **Docker 지원** - 쉬운 배포와 이전
- [x] **오프라인 지원** - PWA 캐시 시스템

## 📞 문의

앱 내 피드백 기능을 이용해주세요!

---

**⚡ Made with ❤️ for Korean POE2 Community**# 배포 트리거
