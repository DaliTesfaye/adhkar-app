import Adhkar from "./components/Adhkar";
import AzkarSalat from "./components/AzkarSalat";
import DuaShamil from "./components/DuaShamil";
import Counter from "./components/Counter";
import Layout from "./Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuranList from "./components/QuranList";
import SurahView from "./components/SurahView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout wrapper */}
        <Route path="/" element={<Layout />}>
          {/* Child route (relative) */}
          <Route path="/adhkarsabahmasa2" element={<Adhkar />} />
          <Route path="/Counter" element = {<Counter />} />
          <Route path="/azkar-salat" element = {<AzkarSalat />} />
          <Route path="/duashamil" element = {<DuaShamil />} />
          <Route path="/quran" element = {<QuranList />} />
          <Route path="/quran/:id" element={<SurahView />} /> {/* عرض السورة بناءً على الرقم */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
