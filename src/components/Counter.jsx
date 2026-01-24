import { useState } from "react";

export default function Counter() {
  const adhkar = [
    "استغفر الله و أتوب اليه",
    "سبحان الله و بحمده",
    "لا إله إلا الله وحده لا شريك له",
    "اللهم صلي و سلم على سيدنا محمد"
  ];

  const [counts, setCounts] = useState(Array(adhkar.length).fill(0));

  const increment = (index) => {
    const newCounts = [...counts];
    newCounts[index] += 1;
    setCounts(newCounts);
  };

  const reset = (index) => {
    const newCounts = [...counts];
    newCounts[index] = 0;
    setCounts(newCounts);
  };

  return (
    <section id="counter" className="relative px-6 py-12">
      {/* خلفية خاصة بالعداد */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-slate-800 to-emerald-900 opacity-90 rounded-3xl -z-10"></div>

      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">
        📿 العداد
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {adhkar.map((dhikr, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center shadow-lg hover:scale-105 transition-transform"
          >
            <h3 className="text-lg font-semibold text-white text-center mb-4">
              {dhikr}
            </h3>

            {/* الرقم - عند الضغط يزداد */}
            <p
              onClick={() => increment(i)}
              className="text-4xl font-bold text-yellow-300 mb-4 cursor-pointer select-none active:scale-110 transition"
            >
              {counts[i]}
            </p>

            <button
              onClick={() => reset(i)}
              className="bg-red-500 text-white font-bold px-5 py-2 rounded-xl hover:bg-red-600 transition"
            >
              ⟳ إعادة
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
