import { useState, useRef, useEffect } from "react"
import Link from "next/link"

export default function Header() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (open && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  const items = [
    { href: "/map", label: "감각지도" },
    { href: "/report", label: "감각리포트" },
    { href: "/shop", label: "감각상점" },
    { href: "/data-market", label: "데이터마켓" },
    { href: "/mypage", label: "마이페이지" },
  ]

  return (
    <header className="relative bg-white shadow">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center">
        {/* 왼쪽: 햄버거 + 로고 */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setOpen(o => !o)}
            className="p-2 rounded hover:bg-gray-100"
            aria-label="메뉴 열기"
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          <Link href="/" className="text-2xl font-bold text-gray-900">
            SENSE
          </Link>
        </div>

        {/* 가운데: 검색창 (flex-1로 너비 확보) */}
        <div className="flex-1 mx-8">
          <div className="flex items-center border border-gray-300 rounded overflow-hidden w-full">
            <input
              type="text"
              placeholder="감각 키워드, 지역 검색"
              className="flex-1 px-3 py-1 outline-none"
            />
            <button className="bg-green-500 text-white px-4 py-1">
              검색
            </button>
          </div>
        </div>

        {/* 오른쪽: 로그인 */}
        <div>
          <Link href="/login" className="text-gray-700 hover:text-gray-900">
            로그인
          </Link>
        </div>
      </div>

      {/* 드롭다운 메뉴 */}
      {open && (
        <div
          ref={menuRef}
          className="absolute top-full left-0 w-full bg-white shadow-md z-50"
        >
          <nav className="flex flex-col py-4 space-y-2 px-6">
            {items.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block py-2 hover:text-gray-900"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
