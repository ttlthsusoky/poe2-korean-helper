import { NextRequest, NextResponse } from 'next/server'

// POST /api/feedback - 피드백 제출
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, title, content, email } = body

    // 유효성 검증
    if (!type || !title || !content) {
      return NextResponse.json({
        success: false,
        error: '필수 필드가 누락되었습니다.'
      }, { status: 400 })
    }

    // 제목과 내용 길이 검증
    if (title.length > 200) {
      return NextResponse.json({
        success: false,
        error: '제목은 200자 이내로 입력해주세요.'
      }, { status: 400 })
    }

    if (content.length > 5000) {
      return NextResponse.json({
        success: false,
        error: '내용은 5000자 이내로 입력해주세요.'
      }, { status: 400 })
    }

    // 이메일 유효성 검증 (선택적)
    if (email && !isValidEmail(email)) {
      return NextResponse.json({
        success: false,
        error: '올바른 이메일 주소를 입력해주세요.'
      }, { status: 400 })
    }

    // 요청자 정보 수집
    const userAgent = request.headers.get('user-agent')
    const forwarded = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const ipAddress = forwarded?.split(',')[0] || realIp || '127.0.0.1'

    let feedback = null
    let source = 'database'
    
    // 데이터베이스 없이 로깅만
    source = 'logged'
    feedback = {
      id: Date.now(),
      type: type.toUpperCase(),
      title,
      content,
      email: email || null,
      userAgent,
      ipAddress,
      createdAt: new Date(),
      status: 'PENDING'
    }
    console.log('FEEDBACK:', JSON.stringify(feedback, null, 2))

    return NextResponse.json({
      success: true,
      data: feedback,
      source,
      message: '피드백이 성공적으로 제출되었습니다. 소중한 의견 감사합니다!'
    })
  } catch (error) {
    console.error('피드백 제출 에러:', error)
    return NextResponse.json({
      success: false,
      error: '피드백을 제출할 수 없습니다. 잠시 후 다시 시도해주세요.'
    }, { status: 500 })
  }
}

// GET /api/feedback - 피드백 목록 조회 (관리자용) - 비활성화됨
export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: false,
    error: '데이터베이스가 연결되지 않았습니다.'
  }, { status: 500 })
}

// 이메일 유효성 검증 함수
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}