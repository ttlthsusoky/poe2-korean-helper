# 🎮 POE2헬퍼 Play Store 업로드 가이드

## 📋 준비 완료 사항
✅ **PWA 최적화 완료**
✅ **Vercel 배포 완료**: https://poe2-korean-helper.vercel.app
✅ **TWA 프로젝트 생성 완료**: `android-twa/` 폴더
✅ **Digital Asset Links 준비 완료**: `public/.well-known/assetlinks.json`

## 🔧 다음 단계: Android Studio에서 APK 빌드

### 1. Android Studio 설치 및 프로젝트 열기
1. **Android Studio** 최신 버전 설치
2. `android-twa` 폴더를 Android Studio에서 열기
3. Gradle 동기화 완료 대기

### 2. 앱 서명 키 생성
```bash
# 키 생성 (Windows)
keytool -genkey -v -keystore poe2helper-release-key.keystore -alias poe2helper -keyalg RSA -keysize 2048 -validity 10000

# SHA256 지문 확인
keytool -list -v -keystore poe2helper-release-key.keystore
```

### 3. Digital Asset Links 업데이트
1. 위에서 얻은 **SHA256 지문**을 복사
2. `public/.well-known/assetlinks.json` 파일 수정:
   ```json
   [{
     "relation": ["delegate_permission/common.handle_all_urls"],
     "target": {
       "namespace": "android_app",
       "package_name": "com.ttlthsusoky.poe2helper",
       "sha256_cert_fingerprints": [
         "여기에_실제_SHA256_지문_붙여넣기"
       ]
     }
   }]
   ```
3. Git 커밋 후 Vercel 재배포

### 4. Android Studio에서 APK/AAB 생성
1. **Build** → **Generate Signed Bundle / APK**
2. **Android App Bundle (AAB)** 선택 (Play Store 권장)
3. 위에서 만든 키스토어 선택
4. **Release** 빌드 선택
5. APK/AAB 파일 생성 대기

### 5. Google Play Console 업로드
1. https://play.google.com/console 접속
2. **새 앱 만들기**
3. 앱 정보 입력:
   - **앱 이름**: POE2헬퍼 - Path of Exile 2 가이드
   - **카테고리**: 게임 > 도구
   - **설명**: Path of Exile 2 한국 커뮤니티를 위한 필수 도구 모음
4. AAB 파일 업로드
5. 스토어 등록정보 작성
6. 검토 제출

## 📱 앱 정보 (Play Store 등록용)

### 앱 기본 정보
- **패키지명**: `com.ttlthsusoky.poe2helper`
- **앱 이름**: `POE2헬퍼 - Path of Exile 2 가이드`
- **버전**: 1.0 (versionCode: 1)
- **최소 API 레벨**: 21 (Android 5.0)
- **타겟 API 레벨**: 34 (Android 14)

### 앱 설명 (Play Store용)
**짧은 설명**:
Path of Exile 2 플레이어를 위한 필수 도구 모음 - 사이트 링크, 용어 번역, 가이드 제공

**긴 설명**:
🎮 Path of Exile 2 한국 커뮤니티를 위한 최고의 도구 앱!

✨ 주요 기능:
• 📱 네이티브 앱처럼 빠른 PWA 기술
• 🔗 엄선된 POE2 필수 사이트 모음
• 🈁 게임 용어 실시간 한글 번역
• 📊 빌드 가이드 및 데이터베이스 통합
• 💰 경제 정보 및 가격 정보

🌟 포함된 사이트들:
• POE2DB - 종합 데이터베이스
• POE2 Ninja - 경제 정보 및 빌드 통계  
• Maxroll - 프로 빌드 가이드
• Craft of Exile - 아이템 제작 시뮬레이터
• Path of Building - 빌드 계획 도구
• 한국 POE 커뮤니티
• 그 외 다수!

⚠️ 비공식 앱입니다. Grinding Gear Games와 무관합니다.

### 키워드
Path of Exile 2, POE2, 게임 가이드, 빌드, ARPG, 한국어, 도구

### 카테고리
게임 > 도구

## 📸 필요한 자료
- **앱 아이콘**: 512x512px (이미 준비됨)
- **스크린샷**: 모바일 2-8장, 태블릿 선택사항
- **배너 이미지**: 1024x500px
- **개발자 정보**: 연락처, 개인정보처리방침 URL

## ⚠️ 주의사항
1. **Digital Asset Links** 검증 필수
2. **앱 서명** 키 안전하게 보관
3. **패키지명** 변경 불가 (신중히 결정)
4. **첫 배포**는 검토에 2-3일 소요
5. **업데이트**는 보통 몇 시간 내 승인

## 🚀 완료 후
앱이 Play Store에 게시되면:
1. 앱 링크를 커뮤니티에 공유
2. 사용자 피드백 수집 및 개선
3. 정기적인 사이트 목록 업데이트
4. 새로운 POE2 콘텐츠 추가