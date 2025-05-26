# 혜택이(Hetaeki) 프론트엔드

> "나이, 지역, 상황에 따라 내가 받을 수 있는 복지 혜택을 AI가 자동으로 추천해주는 서비스"

---

## 📝 프로젝트 개요

- 중앙정부/지자체 복지 정책을 AI가 안내하는 모바일 앱(React Native, Expo 기반)
- 사용자의 나이/지역/질문 정보를 바탕으로 맞춤형 복지 정책을 추천
- GPT-4o 기반 RAG 백엔드와 연동하여 자연어 Q&A, 인기 주제, 광고 보상 등 다양한 기능 제공
<img width="354" alt="스크린샷 2025-05-27 오전 5 47 15" src="https://github.com/user-attachments/assets/ca4e528e-3bf1-43ed-8f0f-6733675f2afc" />
<img width="354" alt="스크린샷 2025-05-27 오전 5 45 09" src="https://github.com/user-attachments/assets/1c5a35e4-0a13-4ef5-ac7c-ba0500eb15ac" />
<img width="354" alt="스크린샷 2025-05-27 오전 5 45 46" src="https://github.com/user-attachments/assets/f5ddff2e-d33b-4ebe-9a75-c5ef2b689714" />
<img width="354" alt="스크린샷 2025-05-27 오전 5 46 00" src="https://github.com/user-attachments/assets/79e7b3a9-e7b4-495f-904c-ba5f91b849ad" />

---

## 🚀 주요 기능

- **이메일/로그인 및 프로필 관리**
- **자연어 질문 기반 복지 정책 Q&A**
- **연령별 인기 복지 주제(HotTopic) 조회**
- **보상형 광고(AdMob) 연동**
- **온보딩, 메인, 프로필, 질문, 핫토픽 등 화면 제공**
- **JWT 기반 인증 및 백엔드 API 연동**

---

## 📁 폴더 구조 및 역할

```
hetaeki_app/
├── App.tsx              # 앱 진입점, 네비게이션/글로벌 설정
├── app.json             # Expo 앱 메타데이터/설정
├── package.json         # 의존성 및 실행 스크립트
├── index.ts             # 엔트리포인트
├── tsconfig.json        # TypeScript 설정
├── assets/              # 앱 아이콘, 이미지, 스플래시 등
├── screens/             # 주요 화면(페이지) 컴포넌트
│   ├── MainScreen.tsx
│   ├── LoginScreen.tsx
│   ├── EmailLoginScreen.tsx
│   ├── EmailSignupScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── HotTopicScreen.tsx
│   └── OnboardingScreen.tsx
├── components/          # 재사용 UI 컴포넌트/모달/버튼 등
│   ├── AdRewardModal.tsx
│   ├── RoundedButton.tsx
│   ├── StyledInput.tsx
│   ├── MessageBubble.tsx
│   └── Card.tsx
├── api/                 # 백엔드 API 연동(axios 인스턴스, 인증, 쿼리 등)
│   ├── instance.ts
│   ├── auth.ts
│   ├── queries.ts
│   └── hottopic.ts
├── constants/           # 색상, 공통 상수 등
│   └── colors.ts
├── utils/               # 유틸 함수(광고, 스토리지 등)
│   ├── showRewardedAd.ts
│   └── storage.ts
├── android/             # 네이티브(Android) 빌드 관련
├── ios/                 # 네이티브(iOS) 빌드 관련
└── ...
```

---

## ⚙️ 설치 및 실행 방법

1. **레포 클론 & 진입**
   ```bash
   git clone https://github.com/your-org/hetaeki_app.git
   cd hetaeki_app
   ```
2. **의존성 설치**
   ```bash
   npm install
   # 또는
   yarn install
   ```
3. **Expo Dev Client 빌드 (최초 1회, 네이티브 모듈 사용 시 필수)**
   ```bash
   npx expo run:ios   # iOS 시뮬레이터/실기기
   npx expo run:android # Android 에뮬레이터/실기기
   ```
   - Expo Go 앱이 아닌 Dev Client로 실행해야 광고 등 네이티브 기능 정상 동작
4. **JS 번들 서버 실행**
   ```bash
   npx expo start
   ```
5. **앱 접속**
   - 시뮬레이터/실기기에서 Dev Client로 접속
   - QR코드 스캔 또는 직접 실행

---

## 🔍 주요 화면/컴포넌트 설명

### screens/
- **MainScreen.tsx**: 메인 홈, 질문 입력/응답, 정책 추천 UI
- **LoginScreen.tsx, EmailLoginScreen.tsx, EmailSignupScreen.tsx**: 이메일/간편 로그인, 회원가입, 인증
- **ProfileScreen.tsx**: 나이/지역/프로필 관리, 로그아웃 등
- **HotTopicScreen.tsx**: 연령별 인기 복지 주제(Top 5) 조회
- **OnboardingScreen.tsx**: 앱 첫 실행 시 온보딩 안내

### components/
- **AdRewardModal.tsx**: 보상형 광고 모달(AdMob 연동)
- **RoundedButton.tsx, StyledInput.tsx**: 공통 버튼/입력 UI
- **MessageBubble.tsx**: Q&A 채팅 UI
- **Card.tsx**: 정책/핫토픽 등 카드형 UI

### api/
- **instance.ts**: axios 인스턴스, 공통 API 설정
- **auth.ts**: 로그인/회원가입/프로필 관련 API
- **queries.ts**: 질문/답변 API
- **hottopic.ts**: 핫토픽 조회 API

### utils/
- **showRewardedAd.ts**: 보상형 광고 로직(react-native-google-mobile-ads)
- **storage.ts**: AsyncStorage 기반 토큰/프로필 저장/불러오기

---

## 🌐 API 연동 구조

- **JWT 기반 인증**: 로그인 시 토큰 발급, AsyncStorage에 저장, API 호출 시 자동 첨부
- **질문/답변, 핫토픽, 프로필 등 모든 데이터는 백엔드 API와 연동**
- **api/instance.ts**에서 공통 baseURL, 인터셉터 등 관리

---

## 📝 환경 변수/설정

- **app.json**에서 앱 이름, 아이콘, 번들ID, 권한 등 Expo 설정 관리
- **광고(AdMob) 연동 시**: 네이티브 빌드 후 실기기에서만 정상 동작
- **백엔드 API 주소**는 api/instance.ts 등에서 직접 관리(환경별 분기 필요시 .env 사용 가능)

---

## 💡 개발/운영 팁

- **Dev Client 빌드** 후 실행해야 광고 등 네이티브 기능 정상 동작
- **시뮬레이터에서는 광고 노출이 제한될 수 있음(실기기 권장)**
- **백엔드 서버와 CORS, 인증, API 버전 일치 여부 확인 필요**
- **앱 아이콘/스플래시/권한 등은 app.json에서 관리**
- **TypeScript 기반, 타입/컴포넌트 재사용 적극 활용**

---

## 📚 참고 자료

- [React Native 공식 문서](https://reactnative.dev/)
- [Expo 공식 문서](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [react-native-google-mobile-ads](https://github.com/invertase/react-native-google-mobile-ads)
- [Axios](https://axios-http.com/)

---

## 🏷️ 라이선스

- 본 프로젝트는 MIT 라이선스를 따릅니다.

---

## 🛠️ 기술 스택

<p align="left">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native"/>
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/React_Navigation-000000?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Navigation"/>
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios"/>
  <img src="https://img.shields.io/badge/AdMob-FFCC00?style=for-the-badge&logo=googleads&logoColor=white" alt="AdMob"/>
  <img src="https://img.shields.io/badge/Lottie-000000?style=for-the-badge&logo=lottie&logoColor=white" alt="Lottie"/>
</p>
