import { useEffect, useState } from "react"
import EmotionChart from "@/components/EmotionChart"
import UploadForm from "@/components/UploadForm"
import Header from "@/components/Header"

interface Record {
  id: number
  date: string
  location: string
  sense_type: string
  keyword: string
  emotion_score: number
  description: string
}

export default function Home() {
  const [records, setRecords] = useState<Record[]>([])
  const [loading, setLoading] = useState(true)

  // 1) 데이터 가져오는 함수
  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/records")
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text)
      }
      const data: Record[] = await res.json()
      setRecords(data)
    } catch (err) {
      console.error("Failed to fetch data:", err)
    } finally {
      setLoading(false)
    }
  }

  // 2) 컴포넌트 마운트 시 한 번만 fetch
  useEffect(() => {
    fetchData()
  }, [])

  // 3) 렌더링 전에 파생 배열 계산
  const latestSix = [...records]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6)

  const topFive = [...records]
    .sort((a, b) => b.emotion_score - a.emotion_score)
    .slice(0, 5)

  // 4) 오직 한 번의 return 안에 모든 UI를 담기
  return (
    <div className="text-gray-800 bg-white font-sans">
      <Header />

      <section className="bg-gray-50 py-20 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          감각 기반 SENSE 데이터마켓
        </h1>
        <p className="text-gray-600 text-lg">
          AI와 감성 데이터를 연결하는 데이터 커머스 플랫폼
        </p>
      </section>

      <section className="py-16 px-6 max-w-4xl mx-auto">
        <UploadForm onUploadSuccess={fetchData} />
      </section>

      <section className="py-16 bg-gray-100 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-orange-600 mb-6">
          최신 데이터 (최신 6개)
        </h2>
        {loading ? (
          <p>불러오는 중...</p>
        ) : latestSix.length === 0 ? (
          <p>기록이 없습니다.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {latestSix.map((rec) => (
              <div key={rec.id} className="bg-white border p-4 rounded shadow">
                <p className="font-bold">
                  {rec.date} – {rec.sense_type} ({rec.keyword})
                </p>
                <p className="text-sm text-gray-600">{rec.location}</p>
                <p className="mt-1 text-sm">감정점수: {rec.emotion_score}</p>
                <p className="text-sm text-gray-700 mt-1">{rec.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="py-16 bg-white px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">
          감정점수 상위 5개
        </h2>
        {loading ? (
          <p>불러오는 중...</p>
        ) : topFive.length === 0 ? (
          <p>기록이 없습니다.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topFive.map((rec) => (
              <div key={rec.id} className="bg-white border p-4 rounded shadow">
                <p className="font-bold">
                  {rec.date} – {rec.sense_type} ({rec.keyword})
                </p>
                <p className="text-sm text-gray-600">{rec.location}</p>
                <p className="mt-1 text-sm">감정점수: {rec.emotion_score}</p>
                <p className="text-sm text-gray-700 mt-1">{rec.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="py-16 bg-white px-6 max-w-6xl mx-auto">
        <EmotionChart data={records} />
      </section>

      <footer className="bg-white border-t py-8 mt-12">
        <div className="text-center text-sm text-gray-500">
          © 2025 SENSE. 모든 권리 보유. | 개인정보처리방침 | 이용약관
        </div>
      </footer>
    </div>
  )
}
