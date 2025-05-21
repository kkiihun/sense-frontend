// components/UploadForm.tsx
import { useState } from "react";

interface Props {
  onUploadSuccess: () => void;
}

export default function UploadForm({ onUploadSuccess }: Props) {
  const getCurrentDateTimeLocal = (): string => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const local = new Date(now.getTime() - offset * 60 * 1000);
    return local.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM
  };

  const [form, setForm] = useState({
    date: getCurrentDateTimeLocal(),
    location: "",
    sense_type: "",
    keyword: "",
    emotion_score: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert("성공적으로 업로드되었습니다!");
      setForm({
        date: getCurrentDateTimeLocal(),
        location: "",
        sense_type: "",
        keyword: "",
        emotion_score: "",
        description: "",
      });
      onUploadSuccess();  // ← 여기서 상위 컴포넌트에 알립니다.
    } else {
      alert("업로드 실패");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-gray-100 p-6 rounded shadow"
    >
      <input
        type="datetime-local"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="input"
        required
      />
      <input
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="장소"
        className="input"
        required
      />
      <input
        name="sense_type"
        value={form.sense_type}
        onChange={handleChange}
        placeholder="감각유형 (예: 맛, 향)"
        className="input"
        required
      />
      <input
        name="keyword"
        value={form.keyword}
        onChange={handleChange}
        placeholder="키워드"
        className="input"
      />
      <input
        name="emotion_score"
        type="number"
        value={form.emotion_score}
        onChange={handleChange}
        placeholder="감정점수 (-5 ~ 5)"
        className="input"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="감정 설명"
        className="input"
      />
      <button
        type="submit"
        className="bg-orange-500 text-white px-4 py-2 rounded"
      >
        등록
      </button>
    </form>
  );
}
