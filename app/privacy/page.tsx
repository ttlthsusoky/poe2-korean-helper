export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-yellow-400">개인정보처리방침</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3 text-yellow-300">1. 수집하는 개인정보</h2>
            <p className="text-gray-300">
              본 앱은 사용자의 개인정보를 수집하지 않습니다. 
              모든 데이터는 사용자의 기기에 로컬로 저장되며, 외부 서버로 전송되지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-yellow-300">2. 정보의 이용목적</h2>
            <p className="text-gray-300">
              - Path of Exile 2 관련 사이트 링크 제공<br/>
              - 사용자 편의를 위한 앱 기능 개선<br/>
              - 앱 사용 통계 분석 (개인정보 미포함)
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-yellow-300">3. 개인정보 보유기간</h2>
            <p className="text-gray-300">
              본 앱은 개인정보를 수집하지 않으므로 별도의 보유기간이 없습니다.
              사용자가 설정한 기본 설정값만 로컬에 저장됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-yellow-300">4. 제3자 제공</h2>
            <p className="text-gray-300">
              본 앱은 사용자의 정보를 제3자에게 제공하지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-yellow-300">5. 쿠키 및 유사기술</h2>
            <p className="text-gray-300">
              앱 설정 저장을 위해 로컬 스토리지를 사용합니다.
              개인식별정보는 포함되지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-yellow-300">6. 연락처</h2>
            <p className="text-gray-300">
              개인정보처리방침 관련 문의: 앱 내 피드백 기능 이용
            </p>
          </section>

          <section className="mt-8 text-sm text-gray-500">
            <p>최종 수정일: 2025년 8월 27일</p>
            <p>본 앱은 비공식 POE2 커뮤니티 도구입니다.</p>
          </section>
        </div>
      </div>
    </div>
  );
}