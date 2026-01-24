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





export default function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const gregorianDate = time.toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const hijriDate = "27 ربيع الأول 1447 هـ"; // لاحقًا API

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
          {[
            { name: "الفجر", time: "05:12", icon: <Sunrise className="w-6 h-6 text-blue-300" /> },
            { name: "الظهر", time: "12:45", icon: <Sun className="w-6 h-6 text-yellow-400" /> },
            { name: "العصر", time: "16:15", icon: <Sunset className="w-6 h-6 text-orange-400" /> },
            { name: "المغرب", time: "18:35", icon: <CloudMoon className="w-6 h-6 text-pink-400" /> },
            { name: "العشاء", time: "20:05", icon: <Star className="w-6 h-6 text-indigo-300" /> },
            { name: "الجمعة", time: "13:15", icon: <CalendarClock className="w-6 h-6 text-green-300" /> },
          ].map((prayer, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-md text-center flex flex-col items-center gap-2 hover:scale-105 transition-transform"
            >
              {prayer.icon}
              <h3 className="text-lg font-bold">{prayer.name}</h3>
              <p className="text-sm">{prayer.time}</p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
