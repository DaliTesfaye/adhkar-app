import { useState, useEffect } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  Moon,
  Sunrise,
  Sun,
  Sunset,
  CloudMoon,
  Star,
  CalendarClock,
} from "lucide-react";
import { fetchPrayerTimes } from "../utils/fetchPrayerTimes";


export default function Header() {
  const [time, setTime] = useState(new Date());
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchPrayerTimes()
      .then(setPrayerTimes)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const gregorianDate = time.toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const hijriDate = prayerTimes?.hijriDate || "...";

  // Helper to format time as valid 24h HH:mm only
  function formatTime(timeStr) {
    if (!timeStr) return '';
    // Extract first HH:mm from string
    const match = timeStr.match(/(\d{1,2}):(\d{2})/);
    if (!match) return '';
    let [_, h, m] = match;
    h = Math.max(0, Math.min(23, parseInt(h, 10))).toString().padStart(2, '0');
    m = Math.max(0, Math.min(59, parseInt(m, 10))).toString().padStart(2, '0');
    return `${h}:${m}`;
  }

  return (
    <header className="relative py-12 text-white shadow-xl rounded-b-3xl overflow-hidden">
      {/* صورة الخلفية */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/26436656/pexels-photo-26436656.jpeg"
          alt="Mosque background"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* المحتوى */}
      <div className="relative container mx-auto px-6 py-12 flex flex-col gap-10">
        {/* الصف العلوي */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* الوقت */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-lg flex items-center gap-3">
            <Clock className="w-6 h-6 text-yellow-300" />
            <h1 className="text-4xl font-extrabold tracking-wider">
              {time.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </h1>
          </div>

          {/* التاريخ */}
          <div className="flex flex-col gap-3 text-center">
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl shadow-lg flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-green-300" />
              <p className="text-lg font-semibold">{gregorianDate}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl shadow-lg flex items-center gap-2">
              <Moon className="w-5 h-5 text-blue-300" />
              <p className="text-lg font-semibold">{hijriDate}</p>
            </div>
          </div>

          {/* المدينة */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-lg flex items-center gap-2">
            <MapPin className="w-6 h-6 text-red-300" />
            <h2 className="text-xl font-bold">تونس</h2>
          </div>
        </div>

        {/* أوقات الصلاة */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 w-full max-w-6xl mx-auto">
          {loading && (
            <div className="col-span-6 text-center text-white">جاري جلب أوقات الصلاة ...</div>
          )}
          {error && (
            <div className="col-span-6 text-center text-red-400">{error}</div>
          )}
          {prayerTimes && [
            { name: "الفجر", key: "الفجر", icon: <Sunrise className="w-6 h-6 text-blue-300" /> },
            { name: "الشروق", key: "الشروق", icon: <Sun className="w-6 h-6 text-yellow-200" /> },
            { name: "الظهر", key: "الظهر", icon: <Sun className="w-6 h-6 text-yellow-400" /> },
            { name: "العصر", key: "العصر", icon: <Sunset className="w-6 h-6 text-orange-400" /> },
            { name: "المغرب", key: "المغرب", icon: <CloudMoon className="w-6 h-6 text-pink-400" /> },
            { name: "العشاء", key: "العشاء", icon: <Star className="w-6 h-6 text-indigo-300" /> },
            // { name: "الجمعة", key: "الجمعة", icon: <CalendarClock className="w-6 h-6 text-green-300" /> },
          ].map((prayer, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-md text-center flex flex-col items-center gap-2 hover:scale-105 transition-transform"
            >
              {prayer.icon}
              <h3 className="text-lg font-bold">{prayer.name}</h3>
              <p className="text-sm">{formatTime(prayerTimes[prayer.key])}</p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
