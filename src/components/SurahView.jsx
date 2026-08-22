import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SurahView() {
  const { id } = useParams();
  const [surah, setSurah] = useState(null);

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/quran/quran-uthmani")
      .then(res => res.json())
      .then(data => {
        const found = data.data.surahs.find(s => s.number == id);
        setSurah(found);
      });
  }, [id]);

  if (!surah) return <p className="text-center">جاري التحميل...</p>;

  return (
    <section className="p-6 max-w-3xl mx-auto bg-white/10 rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-4">{surah.name}</h2>

      <p className="text-center text-sm mb-6">
        عدد الآيات: {surah.ayahs.length}
      </p>

      {surah.ayahs.map((ayah) => (
        <p
          key={ayah.number}
          className="text-xl leading-loose text-right mb-4"
        >
          {ayah.text}
          <span className="text-yellow-300 text-sm">
            {" "}﴿{ayah.numberInSurah}﴾
          </span>
        </p>
      ))}
    </section>
  );
}
