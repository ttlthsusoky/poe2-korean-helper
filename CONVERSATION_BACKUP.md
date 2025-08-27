# POE2 헬퍼 앱 개발 대화 백업
*백업 날짜: 2025-08-27*

## 📋 프로젝트 개요
- **목표**: POE2 헬퍼 앱을 Google Play Store에 출시
- **기술**: Next.js 14, PWA, TypeScript, Tailwind CSS
- **배포**: Vercel → PWABuilder → Android Studio → Play Store

## ✅ 완료된 작업들

### 1. 로컬 개발 환경 설정
- Docker 환경 구성 완료
- 앱 실행 및 기능 테스트 완료

### 2. PWA 최적화 및 수정사항
- **사이트 목록 업데이트**: 
  - Exiled Exchange 2 삭제
  - POE2 Skill Tree Planner 삭제  
  - POE 2 Skill Tree Planner 삭제
  - 창작 탭 제거
  - POE2 Ninja 카테고리 ECONOMY → TOOL 변경
  - 사용자 텍스트 파일 기반 사이트 설명 간소화

### 3. Vercel 배포
- **URL**: https://poe2-korean-helper.vercel.app
- GitHub Actions 연동 완료
- Prisma 빌드 오류 해결 (health API 수정)

### 4. TWA (Trusted Web Activity) 설정
- Digital Asset Links 준비 완료
- 패키지명: `com.ttlthsusoky.poe2helper`

### 5. 아이콘 교체
- 사용자 제공 POE2 커스텀 로고 적용
- `C:\Users\hee\Desktop\ICON.jpg` → 모든 크기 아이콘 생성
- `generate_icons.py` 스크립트 업데이트

### 6. PWABuilder 검증 오류 해결
- **해결한 오류들**:
  - ✅ Icons: maskable과 any purpose 분리
  - ✅ Screenshots: 배열 추가
  - ✅ iarc_rating_id: 플레이스홀더 추가
  - ✅ Background sync: API 엔드포인트 구현
  - ✅ Offline support: 서비스워커 최적화
  - ✅ Push notifications: 알림 시스템 구현

### 7. Android Studio APK 생성
- PWABuilder 무서명 파일 → Android Studio 서명 완료
- 패키지명 `com.example` → `com.ttlthsusoky.poe2helper` 변경

### 8. Google Play Console 등록
- ✅ 개발자 계정 생성 및 $25 결제 완료
- ✅ 서명된 AAB 파일 업로드 완료
- ✅ 내부 테스트 설정 및 출시 완료
- ✅ 테스터 추가 완료
- ✅ 개인정보처리방침 URL 설정 완료

## 📄 주요 파일 변경사항

### manifest.json
```json
{
  "name": "POE2 헬퍼 - 패스 오브 엑자일 2 가이드",
  "short_name": "POE2헬퍼",
  "description": "Path of Exile 2 한국 커뮤니티를 위한 필수 도구 모음 - 사이트 링크, 용어 번역, 가이드 (비공식)",
  "start_url": "/",
  "display": "standalone",
  "background_sync": { "enabled": true },
  "scope_extensions": [{"origin": "https://poe2-korean-helper.vercel.app"}],
  "offline": { "enabled": true },
  "screenshots": [...]
}
```

### 개인정보처리방침 페이지
- **경로**: `/app/privacy/page.tsx`
- **URL**: https://poe2-korean-helper.vercel.app/privacy
- 개인정보 비수집 명시, 로컬 저장만 사용

### 사이트 데이터 업데이트 (page.tsx)
- Exiled Exchange 2, POE2 Skill Tree Planner 삭제
- 사용자 텍스트 파일 기반 간소화된 설명 적용
- 영어 최소화, 한국어 중심

### 생성된 API 엔드포인트
- `/api/push` - 푸시 알림 지원
- `/api/sync` - 백그라운드 동기화

## 🔄 현재 상태
- **내부 테스트**: ✅ 출시 완료, 테스트 링크 대기 중
- **테스터**: 사용자 이메일 추가 완료
- **개인정보처리방침**: URL 설정 완료

## ⏭️ 다음 단계 (내일 진행)

### 1. 내부 테스트 확인
- [ ] 테스트 링크 이메일 또는 Play Console에서 직접 링크 확인
- [ ] 안드로이드 폰에서 앱 설치 및 테스트
- [ ] 모든 기능 정상 작동 확인

### 2. Store Listing 완성
- [ ] **앱 아이콘**: `/icons/icon-512x512.png` 업로드
- [ ] **스크린샷**: 앱 화면 캡처 (2-8장 필요)
- [ ] **자세한 설명** 작성
- [ ] **콘텐츠 등급** 설정 (전체 이용가)

### 3. 프로덕션 출시
- [ ] Store Listing 검토 완료
- [ ] **"릴리스" → "프로덕션"**으로 앱 이동
- [ ] 출시 국가 선택 (한국)
- [ ] 최종 검토 및 출시

## 📞 연락처 및 중요 정보
- **Vercel 사이트**: https://poe2-korean-helper.vercel.app
- **개인정보처리방침**: https://poe2-korean-helper.vercel.app/privacy
- **GitHub**: https://github.com/ttlthsusoky/poe2-korean-helper
- **패키지명**: com.ttlthsusoky.poe2helper
- **Play Console**: Google Play 개발자 계정으로 로그인

## 🚨 참고사항
- PWABuilder 경고(가독화 파일)는 PWA 특성상 정상이므로 무시
- 프로덕션 접근 권한은 내부 테스트 완료 후 자동으로 활성화됨
- 앱 검토 시간은 보통 1-3일 소요

---
**마지막 업데이트**: 2025-08-27 - 내부 테스트 출시 완료