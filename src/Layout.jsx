import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";

export default function Layout() {
  return (
    <div className="relative min-h-screen text-white font-arabic bg-black">
      {/* صورة الخلفية الثابتة لنفس تأثير الهيدر */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/26436656/pexels-photo-26436656.jpeg"
          alt="Mosque background"
          className="w-full h-full object-cover"
        />
        {/* طبقة التعتيم المطابقة للهيدر الأصلي (bg-black/60) */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* المحتوى العام */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between">
        <div>
          <Header />
          <Menu />
          <main className="container mx-auto px-4 py-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}