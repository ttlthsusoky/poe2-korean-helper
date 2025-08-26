import { NextRequest, NextResponse } from 'next/server'

// POST /api/sites/[id]/click - 사이트 클릭 통계 기록
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const siteId = parseInt(params.id)
    
    if (isNaN(siteId)) {
      return NextResponse.json({
        success: false,
        error: '잘못된 사이트 ID입니다.'
      }, { status: 400 })
    }

    // 클릭 정보 수집
    const userAgent = request.headers.get('user-agent')
    const referer = request.headers.get('referer')
    const forwarded = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const ipAddress = forwarded?.split(',')[0] || realIp || '127.0.0.1'

    // 데이터베이스 없이 로깅만
    console.log(`CLICK: Site ${siteId}, IP: ${ipAddress}, UserAgent: ${userAgent?.substring(0, 50)}`)

    return NextResponse.json({
      success: true,
      message: '클릭이 기록되었습니다.'
    })
  } catch (error) {
    console.error('클릭 기록 에러:', error)
    // 클릭 기록 실패해도 성공 응답 (사이트 방문을 차단하지 않음)
    return NextResponse.json({
      success: true,
      message: '클릭이 기록되었습니다.'
    })
  }
}