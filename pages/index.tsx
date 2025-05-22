// pages/index.tsx
import { useEffect, useState } from "react"
import Head from "next/head"
import Image from "next/image"
import Header from "@/components/Header"
import UploadForm from "@/components/UploadForm"
import EmotionChart from "@/components/EmotionChart"

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

  // 데이터 가져오기
  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/records")
      if (!res.ok) throw new Error(await res.text())
      const data: Record[] = await res.json()
      setRecords(data)
    } catch (err) {
      console.error("Failed to fetch data:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // 파생 배열 생성
  const latestSix = [...records]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6)

  const topFive = [...records]
    .sort((a, b) => b.emotion_score - a.emotion_score)
    .slice(0, 5)

  return (
    <>
      <Head>
        <title>SENSE 데이터마켓</title>
      </Head>

      <div className="text-gray-800 bg-white font-sans min-h-screen">
        <Header />

        {/* Hero 섹션 */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-screen-xl mx-auto px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              감각 기반 SENSE 데이터마켓
            </h1>
            <p className="text-lg lg:text-xl text-gray-600">
              감성 데이터와 AI를 연결하는 데이터 커머스 플랫폼
            </p>
          </div>
        </section>

        {/* Banner 섹션: public/banner.png 파일을 가져와서 표시 */}
        <section className="bg-white py-8">
          <div className="max-w-screen-xl mx-auto px-8">
            <Image
              src="/images/banner.png"
              alt="Academy 데이터 배너"
              width={1280}
              height={300}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </section>

        {/* Main 컨텐츠 */}
        <main className="max-w-screen-xl mx-auto px-8 py-12 space-y-16">
          {/* 업로드 폼 */}
          <section className="bg-white shadow-lg rounded-lg p-8">
            <UploadForm onUploadSuccess={fetchData} />
          </section>

          {/* 최신 데이터 (6개) */}
          <section>
            <h2 className="text-2xl font-bold text-orange-600 mb-6">
              최신 데이터 (최신 6개)
            </h2>
            {loading ? (
              <p className="text-center">불러오는 중...</p>
            ) : latestSix.length === 0 ? (
              <p className="text-center">기록이 없습니다.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestSix.map((rec) => (
                  <div key={rec.id} className="bg-gray-100 rounded-lg p-6">
                    <p className="text-sm text-gray-600">
                      {rec.date} – {rec.sense_type}
                    </p>
                    <p className="font-semibold text-lg mt-2">
                      {rec.location}
                    </p>
                    <p className="mt-1">감정점수: {rec.emotion_score}</p>
                    <p className="text-gray-700 mt-2">{rec.description}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 감정점수 상위 5개 */}
          <section>
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              감정점수 상위 5개
            </h2>
            {loading ? (
              <p className="text-center">불러오는 중...</p>
            ) : topFive.length === 0 ? (
              <p className="text-center">기록이 없습니다.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topFive.map((rec) => (
                  <div key={rec.id} className="bg-gray-100 rounded-lg p-6">
                    <p className="text-sm text-gray-600">
                      {rec.date} – {rec.sense_type}
                    </p>
                    <p className="font-semibold text-lg mt-2">
                      {rec.location}
                    </p>
                    <p className="mt-1">감정점수: {rec.emotion_score}</p>
                    <p className="text-gray-700 mt-2">{rec.description}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 감정 차트 */}
          <section>
            <EmotionChart data={records} />
          </section>
        </main>

        {/* 푸터 */}
        <footer className="bg-white border-t py-8 mt-12">
          <div className="text-center text-sm text-gray-500">
            © 2025 SENSE. 모든 권리 보유. | 개인정보처리방침 | 이용약관
          </div>
        </footer>
      </div>
    </>
  )
}
