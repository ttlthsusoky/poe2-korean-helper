import { NextResponse } from 'next/server'

// GET /api/health - 헬스체크 엔드포인트 (데이터베이스 없이 작동)
export async function GET() {
  try {
    const healthInfo = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: 'not_required',
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    }

    return NextResponse.json(healthInfo)
  } catch (error) {
    console.error('Health check failed:', error)
    
    const healthInfo = {
      status: 'error',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: 'not_required',
      error: 'Service error',
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    }

    return NextResponse.json(healthInfo, { status: 500 })
  }
}