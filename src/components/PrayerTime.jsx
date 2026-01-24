import { Clock, Sun, Sunrise, Sunset, Moon } from "lucide-react";

export default function PrayerTimes() {
  const prayers = [
    { name: "الفجر", time: "05:12", icon: <Sunrise className="w-6 h-6 text-blue-300" /> },
    { name: "الظهر", time: "12:35", icon: <Sun className="w-6 h-6 text-yellow-400" /> },
    { name: "العصر", time: "15:58", icon: <Sun className="w-6 h-6 text-orange-400" /> },
    { name: "المغرب", time: "18:45", icon: <Sunset className="w-6 h-6 text-red-400" /> },
    { name: "العشاء", time: "20:10", icon: <Moon className="w-6 h-6 text-indigo-400" /> },
  ];

  return (
    <section className="px-6 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">🕌 أوقات الصلاة</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
        {prayers.map((prayer, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-5 flex flex-col items-center shadow-lg hover:scale-105 transition-transform"
          >
            <div className="mb-3">{prayer.icon}</div>
            <h3 className="text-lg font-semibold text-white">{prayer.name}</h3>
            <p className="text-xl font-bold text-yellow-300">{prayer.time}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
