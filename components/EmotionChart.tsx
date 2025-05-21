import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface Record {
  id: number;
  sense_type: string;
  emotion_score: number;
}

type RecordMap = {
  [key: string]: number[];
};

export default function EmotionChart() {
  const [records, setRecords] = useState<Record[]>([]);

  useEffect(() => {
    fetch("/api/records")
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`EmotionChart 오류: ${text}`);
        }
        return res.json();
      })
      .then((data) => setRecords(data))
      .catch((err) => console.error("EmotionChart fetch error:", err));
  }, []);

  const grouped = records.reduce((acc: RecordMap, curr) => {
    const type = curr.sense_type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(curr.emotion_score);
    return acc;
  }, {});

  const labels = Object.keys(grouped);
  const data = labels.map((label) => {
    const scores = grouped[label];
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    return Number(avg.toFixed(2));
  });

  return (
    <div className="max-w-4xl mx-auto my-10">
      <h2 className="text-xl font-bold mb-4 text-center">감각 유형별 평균 감정 점수</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Pie
            data={{
              labels,
              datasets: [
                {
                  label: '평균 감정점수',
                  data,
                  backgroundColor: [
                    '#f87171', '#fbbf24', '#34d399', '#60a5fa', '#c084fc',
                  ],
                },
              ],
            }}
          />
        </div>
        <div>
          <Bar
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                title: {
                  display: true,
                  text: 'Bar Chart - 감정 점수 평균',
                },
              },
            }}
            data={{
              labels,
              datasets: [
                {
                  label: '평균 감정점수',
                  data,
                  backgroundColor: '#4f46e5',
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}
