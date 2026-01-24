import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AzkarSalat() {
  const [adhkar, setAdhkar] = useState([]);
  const [index, setIndex] = useState(0);

  // جلب البيانات من json server
  useEffect(() => {
    fetch("http://localhost:3000/azkarSalat")
      .then((res) => res.json())
      .then((data) => setAdhkar(data))
      .catch((err) => console.log(err));
  }, []);

  // تغيير تلقائي كل 7 ثواني
  useEffect(() => {
    if (adhkar.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % adhkar.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [adhkar]);

  const next = () => setIndex((prev) => (prev + 1) % adhkar.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + adhkar.length) % adhkar.length);

  if (adhkar.length === 0) {
    return <p className="text-white text-center">جاري تحميل الأذكار...</p>;
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] bg-white/10 backdrop-blur-md rounded-2xl p-6 mx-4 shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-16 text-white">
        🕌 أذكار بعد الصلاة
      </h2>

      <div className="flex items-center justify-between w-full max-w-2xl">
        {/* زر السابق */}
        <button
          onClick={prev}
          className="absolute left-8 p-3 rounded-full bg-white/20 hover:bg-white/30 transition"
        >
          <ChevronLeft size={28} className="text-white" />
        </button>

        {/* الذكر */}
        <div className="flex-1 text-center px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="text-xl md:text-2xl font-semibold text-white"
            >
              {adhkar[index].text}
              <br />
              <p className="mt-4 text-md text-white inline-block px-4 py-1 rounded-full">
                 ({adhkar[index].repeat})
              </p>
              <br />
              <p className="mt-2 text-md text-white/80">{adhkar[index].note}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* زر التالي */}
        <button
          onClick={next}
          className="absolute right-8 p-3 rounded-full bg-white/20 hover:bg-white/30 transition"
        >
          <ChevronRight size={28} className="text-white" />
        </button>
      </div>

      {/* المؤشرات */}
      <div className="flex mt-6 space-x-2">
        {adhkar.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          ></span>
        ))}
      </div>
    </section>
  );
}
