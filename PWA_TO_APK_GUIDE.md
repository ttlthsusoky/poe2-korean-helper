# 🚀 PWA를 APK로 변환하는 간단한 방법

## 🌟 추천 방법: PWABuilder (Microsoft)

### 1️⃣ PWABuilder 사용
1. **https://www.pwabuilder.com** 접속
2. **URL 입력**: `https://poe2-korean-helper.vercel.app`
3. **"Start" 버튼** 클릭
4. PWA 품질 점검 완료 대기
5. **"Package For Stores" 탭** 클릭
6. **Android** 섹션에서 **"Download Package"** 클릭

### 2️⃣ 생성된 파일 구조
```
poe2helper-android/
├── app-release.aab     # Play Store 업로드용
├── app-debug.apk       # 테스트용  
├── keystore.keystore   # 서명 키
└── README.md          # 설치 가이드
```

### 3️⃣ Digital Asset Links 설정
1. 생성된 **SHA256 지문**을 복사
2. **Vercel 프로젝트**의 `/.well-known/assetlinks.json` 업데이트
3. 실제 지문으로 교체:
```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app", 
    "package_name": "com.ttlthsusoky.poe2helper",
    "sha256_cert_fingerprints": [
      "실제_SHA256_지문_여기에_붙여넣기"
    ]
  }
}]
```

## 🎯 Alternative: Capacitor (Ionic)

### 1️⃣ Capacitor 설치 및 설정
```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android
npx cap init "POE2헬퍼" "com.ttlthsusoky.poe2helper"
```

### 2️⃣ Android 플랫폼 추가
```bash
npx cap add android
npm run build
npx cap copy
npx cap open android
```

### 3️⃣ Android Studio에서 빌드
- Android Studio가 자동으로 열림
- **Build → Generate Signed Bundle/APK** 선택
- APK 또는 AAB 생성

## 🏪 Play Store 업로드 체크리스트

### ✅ 준비사항
- [ ] **Google Play Developer 계정** (등록비 $25)
- [ ] **앱 아이콘** 512x512px (준비됨)
- [ ] **스크린샷** 2-8장 (모바일/태블릿)
- [ ] **APK/AAB 파일** 
- [ ] **개인정보처리방침** URL
- [ ] **앱 설명** 및 키워드

### 📱 앱 정보
- **패키지명**: `com.ttlthsusoky.poe2helper`
- **앱 이름**: `POE2헬퍼 - Path of Exile 2 가이드`
- **카테고리**: 게임 > 도구
- **연령 등급**: 전체 이용가

### 🖼️ 필요한 이미지들
- **앱 아이콘**: 512x512px (있음)
- **배너**: 1024x500px (선택사항)
- **스크린샷**: 
  - 폰: 최소 2장 (390x844px 권장)
  - 태블릿: 선택사항 (1024x768px)

## 🎉 최종 단계

1. **APK/AAB 생성** (위 방법 중 선택)
2. **Google Play Console** 접속
3. **새 앱 만들기**
4. **파일 업로드** 및 정보 입력
5. **검토 제출** (2-3일 소요)

**🚨 주의**: 첫 배포 시 Google 검토가 있어서 승인까지 시간이 걸립니다.