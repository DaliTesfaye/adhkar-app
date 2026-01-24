// Returns prayer times in Arabic
export async function fetchPrayerTimes() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const dateStr = `${day}-${month}-${year}`;
  const url = `https://api.aladhan.com/v1/timingsByCity/${dateStr}?city=Tunis&country=Tunisia&method=2&language=ar`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('فشل في جلب أوقات الصلاة');
  const data = await response.json();
  const timings = data.data.timings;
  const hijri = data.data.date.hijri;
  return {
    الفجر: timings.Fajr.split(' ')[0],
    الشروق: timings.Sunrise.split(' ')[0],
    الظهر: timings.Dhuhr.split(' ')[0],
    العصر: timings.Asr.split(' ')[0],
    المغرب: timings.Maghrib.split(' ')[0],
    العشاء: timings.Isha.split(' ')[0],
    الجمعة: timings.Jumuah ? timings.Jumuah.split(' ')[0] : timings.Dhuhr.split(' ')[0],
    hijriDate: `${hijri.day} ${hijri.month.ar} ${hijri.year} هـ`,
  };
}
