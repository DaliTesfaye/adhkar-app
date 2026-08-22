import { Link } from "react-router-dom";

export default function Menu() {
  const menu = [
    { name: "الرئيسية", path: "/" },
    { name: "أذكار الصباح و المساء", path: "/adhkarsabahmasa2#adhkarsabahmasa2" },
    { name: "العداد", path: "/counter#counter" },
    { name: "دعاء شامل", path: "/duashamil" },
    { name: "أذكار بعد الصلاة", path: "/azkar-salat" },
    {name: "القرآن الكريم", path: "/quran" },
  ];

  return (
    <section className="px-6 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">
        🕌 القائمة الرئيسية
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
        {menu.map((menus, i) => (
          <Link
            to={menus.path}
            key={i}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-5 flex flex-col items-center shadow-lg hover:scale-105 transition-transform cursor-pointer"
          >
            <h3 className="text-lg font-semibold text-white">{menus.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
