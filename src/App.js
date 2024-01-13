import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import Header from "./components/Header";

const CoinsPage = lazy(() => import("./Pages/CoinsPage"));
const News = lazy(() => import("./Pages/News"));

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Suspense fallback={<div>Loading</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/coins/:id" element={<CoinsPage />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
