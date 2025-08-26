import { NextRequest, NextResponse } from 'next/server'

// GET /api/sites - 더미 데이터 사용 안내
export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: false,
    error: '데이터베이스가 연결되지 않았습니다. 클라이언트에서 더미 데이터를 사용하세요.'
  }, { status: 500 })
}

// POST /api/sites - 비활성화됨
export async function POST(request: NextRequest) {
  return NextResponse.json({
    success: false,
    error: '데이터베이스가 연결되지 않았습니다.'
  }, { status: 500 })
}