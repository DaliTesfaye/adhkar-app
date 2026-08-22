import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function QuranList() {
  const [surahs, setSurahs] = useState([]);

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/quran/quran-uthmani")
      .then((res) => res.json())
      .then((data) => setSurahs(data.data.surahs));
  }, []);

  const translateType = (type) => {
    return type === "Meccan" ? "مكية" : "مدنية";
  };

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">📖 القرآن الكريم</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {surahs.map((surah) => (
          <Link
            key={surah.number}
            to={`/quran/${surah.number}`}
            className="bg-white/10 backdrop-blur-md p-4 rounded-xl text-center hover:bg-white/20 transition shadow"
          >
            {/* اسم السورة */}
            <h3 className="text-lg font-bold mb-2">{surah.name}</h3>

            {/* مكية / مدنية */}
            <p className="text-sm text-green-300">
              {translateType(surah.revelationType)}
            </p>

            {/* عدد الآيات */}
            <p className="text-sm text-yellow-300">
              عدد الآيات: {surah.ayahs.length}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
