# AWSKRUG 출석체크 시스템

React 기반 다중 소모임 출석체크 웹 애플리케이션

🔗 **Production**: https://checkin.awskr.org

## 주요 기능

- 🎯 URL 기반 라우팅: `/{groupCode}/{eventCode}`
- 🎨 25개 소모임 지원 (테마별 커스터마이징)
- 📱 모바일/데스크톱 반응형 디자인
- 🔒 단방향 해시 기반 개인정보 보호
- ⚡ Vite 기반 빠른 빌드

## 빠른 시작

```bash
# 설치
npm install

# 개발 서버
npm run dev

# 빌드
npm run build
```

## URL 구조

```
/{groupCode}                    # 출석체크 페이지 (eventCode 기본값 사용)
/{groupCode}/{eventCode}         # 출석체크 페이지
/{groupCode}/{eventCode}/result  # 결과 페이지
```

**예시**:
- https://checkin.awskr.org/sls
- https://checkin.awskr.org/sls/241224
- https://checkin.awskr.org/ausg/250101

## 지원 소모임

`sls`, `ausg`, `cert`, `ai`, `architecture`, `beginners`, `busan`, `container`, `data`, `deepracer`, `devops`, `euljiro`, `game`, `gudi`, `handson`, `ios`, `iot`, `magok`, `network`, `pangyo`, `platform`, `security`, `seongsu`, `women`

## 배포

### GitHub Pages

```bash
npm run deploy
```

### 수동 배포 (S3 + CloudFront)

```bash
# 빌드
npm run build

# S3 업로드
aws s3 sync dist/ s3://your-bucket/ --delete

# CloudFront 무효화
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

**CloudFront 설정** (SPA 라우팅):
```yaml
CustomErrorResponses:
  - ErrorCode: 404
    ResponseCode: 200
    ResponsePagePath: /index.html
```

## 소모임 추가

`src/config/groups.js`에 설정 추가:

```javascript
newgroup: {
  id: 'newgroup',
  name: 'AWSKRUG 새 소모임',
  title: 'AWSKRUG 새 소모임 출석체크',
  logo: '/images/organization_logo/newgroup.png',
  description: '출석체크를 위해 등록하신 핸드폰 번호를 입력해주세요!',
  subDescription: '제출하신 번호는 출석 체크 용도로만 사용되며, 단방향 해시로 저장됩니다.',
  theme: {
    primaryColor: '#FF9900',
    secondaryColor: '#232F3E',
    logoWidth: '250px',
    logoMargin: '0 0 2rem 0'
  },
  features: {
    showWelcomeImage: false
  }
}
```

로고 이미지를 `public/images/organization_logo/`에 추가하면 완료.

## 프로젝트 구조

```
src/
├── components/
│   └── CheckInForm.jsx      # 출석체크 폼
├── pages/
│   ├── CheckInPage.jsx      # 출석체크 페이지
│   └── ResultPage.jsx       # 결과 페이지
├── config/
│   ├── api.js               # API 설정
│   └── groups.js            # 소모임 설정
├── styles/
│   └── index.css            # 스타일
├── App.jsx                  # 라우팅
└── main.jsx                 # 진입점
```

## 환경 변수

`.env` 파일 생성 (선택사항):

```env
VITE_API_URL=https://your-api.amazonaws.com/prod
```

## 라이선스

MIT
