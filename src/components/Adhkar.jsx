import { useEffect, useState } from "react";

function Adhkar() {
  const [adhkar, setAdhkar] = useState([]);
  const [type, setType] = useState("sabah"); // sabah | masa
  const [loading, setLoading] = useState(true);

  // روابط الـ API الجاهزة للأذكار
  const API_URLS = {
    sabah: "https://ahegazy.github.io/muslimKit/json/azkar_sabah.json",
    masa: "https://ahegazy.github.io/muslimKit/json/azkar_massa.json",
  };

  useEffect(() => {
    setLoading(true);

    // 1. التجميع من LocalStorage أولاً لدعم الـ Offline
    const cacheKey = `adhkar_${type}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      setAdhkar(JSON.parse(cachedData));
      setLoading(false);
    }

    // 2. جلب البيانات الحديثة من الـ API
    fetch(API_URLS[type])
      .then((res) => res.json())
      .then((data) => {
        const list = data.content || [];
        const updated = list.map((item) => ({
          text: item.zekr,
          count: parseInt(item.repeat) || 1,
          note: item.bless || "",
          done: false,
        }));

        setAdhkar(updated);
        localStorage.setItem(cacheKey, JSON.stringify(updated));
        setLoading(false);
      })
      .catch((err) => {
        console.warn("تنبيه: تعذر الاتصال بالشبكة، يتم استخدام البيانات المخزنة محلياً.", err);
        setLoading(false);
      });
  }, [type]);

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

  const allDone = adhkar.length > 0 && adhkar.every((item) => item.done);

  return (
    <div
      id="adhkarsabahmasa2"
      className="flex flex-col items-center justify-start py-6 font-arabic text-white"
    >
      <div className="bg-white/10 backdrop-blur-md shadow-lg rounded-2xl p-6 max-w-2xl w-full border border-white/10">
        <h1 className="text-3xl font-bold text-center text-blue-300 mb-6">
          📿 أذكار {type === "sabah" ? "الصباح" : "المساء"}
        </h1>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setType("sabah")}
            className={`px-5 py-2 rounded-xl font-semibold transition-all ${
              type === "sabah"
                ? "bg-blue-600/80 text-white shadow-md backdrop-blur-sm"
                : "bg-white/10 text-gray-200 hover:bg-white/20"
            }`}
          >
            الصباح
          </button>
          <button
            onClick={() => setType("masa")}
            className={`px-5 py-2 rounded-xl font-semibold transition-all ${
              type === "masa"
                ? "bg-blue-600/80 text-white shadow-md backdrop-blur-sm"
                : "bg-white/10 text-gray-200 hover:bg-white/20"
            }`}
          >
            المساء
          </button>
        </div>

        {loading ? (
          <p className="text-center text-white/80 mt-10">⏳ جاري تحميل الأذكار...</p>
        ) : (
          <ul className="space-y-4">
            {adhkar.map((item, i) => (
              <li
                key={i}
                className={`p-4 rounded-xl text-lg leading-relaxed text-right shadow-sm flex items-start justify-between gap-4 transition-all border ${
                  item.done
                    ? "bg-green-950/30 border-green-500/30 opacity-60 line-through text-gray-300"
                    : "bg-white/10 border-white/10 text-white hover:bg-white/15"
                }`}
              >
                {/* النص والفضل */}
                <div className="flex-1 break-words">
                  {item.text}
                  {item.note && (
                    <div className="mt-2 text-sm text-gray-300 border-r-2 border-blue-400 pr-2">
                      {item.note}
                    </div>
                  )}
                </div>

                {/* زر العداد */}
                <div
                  onClick={() => handleCircleClick(i)}
                  className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full border-2 cursor-pointer font-bold text-lg select-none transition-all ${
                    item.done
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-blue-400 text-blue-300 hover:bg-blue-500/20"
                  }`}
                >
                  {item.done ? "✔" : item.count}
                </div>
              </li>
            ))}
          </ul>
        )}

        {allDone && (
          <p className="text-center mt-6 text-green-400 font-bold text-xl animate-bounce">
            🎉 لقد أنهيت جميع الأذكار! تقبل الله طاعتك.
          </p>
        )}
      </div>
    </div>
  );
}

export default Adhkar;