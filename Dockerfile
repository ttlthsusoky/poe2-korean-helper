FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일들을 먼저 복사 (Docker 캐시 최적화)
COPY package.json package-lock.json ./

# 의존성 설치
RUN npm ci --only=production

# 소스 코드 복사
COPY . .

# Prisma 클라이언트 생성
RUN npx prisma generate

# Next.js 앱 빌드
RUN npm run build

# 포트 노출
EXPOSE 3000

# 건강 체크 설정
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# 앱 실행
CMD ["npm", "start"]