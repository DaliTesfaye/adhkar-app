import { useState } from "react";
import { ChevronLeft , ChevronRight } from "lucide-react";

export default function DuaShamil() {
  const categories = {
    "العفو و العافية": [
      "اللهم إني أسألك العفو والعافية في الدنيا والآخرة",
      "اللهم إني أسألك العفو والعافية في ديني ودنياي وأهلي ومالي",
      "اللهم استر عوراتي وآمن روعاتي"
    ],
    "الرزق": [
      "اللهم ارزقني رزقًا حلالًا طيبًا مباركًا فيه",
      "اللهم ارزقني من حيث لا أحتسب",
      "اللهم وسع لي في رزقي وبارك لي فيه"
    ],
    "المغفرة": [
      "اللهم اغفر لي ولوالدي وللمؤمنين والمؤمنات",
      "اللهم اغفر لي ما قدمت وما أخرت وما أسررت وما أعلنت",
      "اللهم اجعلني من التوابين واجعلني من المتطهرين"
    ],
    "المحبة و الهداية": [
      "اللهم ارزقني حبك وحب من يحبك وحب عمل يقربني إلى حبك",
      "اللهم اهدني وسددني",
      "اللهم اجعلني مقيم الصلاة ومن ذريتي ربنا وتقبل دعاء"
    ]
  };

  const categoryNames = Object.keys(categories);
  const [selectedCategory, setSelectedCategory] = useState(categoryNames[0]);
  const [duaIndex, setDuaIndex] = useState(0);

  const currentDuas = categories[selectedCategory];

  const nextDua = () => {
    setDuaIndex((prev) => (prev + 1) % currentDuas.length);
  };

  const prevDua = () => {
    setDuaIndex((prev) => (prev - 1 + currentDuas.length) % currentDuas.length);
  };

  return (
    <section className="max-w-4xl mx-auto my-10 px-6">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">📖 دعاء شامل</h2>

        {/* قائمة التصنيفات */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categoryNames.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setDuaIndex(0);
              }}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                selectedCategory === cat
                  ? "bg-yellow-400 text-black"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* الدعاء */}
        <div className="relative flex items-center justify-center">
          {/* السابق */}
          <button
            onClick={prevDua}
            className="absolute left-0 p-3 rounded-full bg-white/20 hover:bg-white/30 transition"
          >
            <ChevronLeft size={28} className="text-white" />
          </button>

          <p className="text-xl md:text-2xl font-semibold text-white leading-relaxed px-12">
            {currentDuas[duaIndex]}
          </p>

          {/* التالي */}
          <button
            onClick={nextDua}
            className="absolute right-0 p-3 rounded-full bg-white/20 hover:bg-white/30 transition"
          >
            <ChevronRight size={28} className="text-white" />
          </button>
        </div>

        {/* المؤشر */}
        <div className="flex mt-6 space-x-2 justify-center">
          {currentDuas.map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === duaIndex ? "bg-yellow-400" : "bg-white/40"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}
