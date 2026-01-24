import { useEffect, useState } from "react";

function Adhkar() {
  const [adhkar, setAdhkar] = useState([]);
  const [type, setType] = useState("sabah"); // sabah | masa
  const API_URL = "http://localhost:3000";

  useEffect(() => {
    fetch(`${API_URL}/${type}`)
      .then((res) => res.json())
      .then((data) => {
        // لكل ذكر نبدأ بالعدد من repeat ونضيف done false
        const updated = data.map((item) => ({
          ...item,
          count: item.repeat,
          done: false,
        }));
        setAdhkar(updated);
      });
  }, [type]);

  // عند الضغط على الدائرة
  const handleCircleClick = (index) => {
    setAdhkar((prev) =>
      prev.map((item, i) => {
        if (i === index && !item.done) {
          const newCount = item.count - 1;
          return {
            ...item,
            count: newCount,
            done: newCount <= 0,
          };
        }
        return item;
      })
    );
  };

  if (!adhkar.length) return <p className="text-center mt-10">⏳ Loading...</p>;

  // تحقق إذا اكتملت كل الأذكار
  const allDone = adhkar.every((item) => item.done);

  return (
    <div id="adhkarsabahmasa2" className="min-h-screen flex flex-col items-center justify-start py-10 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] font-arabic text-black">
      <div className="bg-white/10 backdrop-blur-md shadow-lg rounded-2xl p-6 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          📿 أذكار {type === "sabah" ? "الصباح" : "المساء"}
        </h1>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setType("sabah")}
            className={`px-4 py-2 rounded-lg ${
              type === "sabah"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            الصباح
          </button>
          <button
            onClick={() => setType("masa")}
            className={`px-4 py-2 rounded-lg ${
              type === "masa"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            المساء
          </button>
        </div>

        <ul className="space-y-4">
          {adhkar.map((item, i) => (
            <li
              key={i}
              className={`p-4 bg-blue-50 rounded-xl text-lg leading-relaxed text-right shadow-sm flex items-start justify-between gap-4 ${
                item.done ? "bg-green-100 line-through" : ""
              }`}
            >
              {/* النص */}
              <div className="flex-1 break-words">
                {item.text}
                {item.note && (
                  <div className="mt-1 text-sm text-gray-500">{item.note}</div>
                )}
              </div>

              {/* الدائرة */}
              <div
                onClick={() => !allDone && handleCircleClick(i)}
                className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full border-2 cursor-pointer font-bold text-lg ${
                  item.done
                    ? "bg-green-500 border-green-500 text-white"
                    : "border-blue-500 text-blue-700"
                }`}
              >
                {item.done ? "✔" : item.count}
              </div>
            </li>
          ))}
        </ul>

        {allDone && (
          <p className="text-center mt-4 text-green-600 font-bold text-xl">
            🎉 لقد أنهيت جميع الأذكار!
          </p>
        )}
      </div>
    </div>
  );
}

export default Adhkar;
