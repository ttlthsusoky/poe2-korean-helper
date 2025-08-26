import { NextRequest, NextResponse } from 'next/server'

// GET /api/creators - 비활성화됨 
export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: false,
    error: '데이터베이스가 연결되지 않았습니다.'
  }, { status: 500 })
}

// POST /api/creators - 비활성화됨
export async function POST(request: NextRequest) {
  return NextResponse.json({
    success: false,
    error: '데이터베이스가 연결되지 않았습니다.'
  }, { status: 500 })
}