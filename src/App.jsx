import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./components/routes/Feed";
import LeftAside from "./components/layouts/LeftAside";
import Search from "./components/routes/Search";
import logo from "./assets/images/logo.png";
import NotFound from "./components/routes/NotFound";
import Activity from "./components/routes/Activity";
import NewPost from "./components/routes/NewPost";
import Profile from "./components/routes/Profile";

function App() {
  return (
    <Router>
      <div className="flex flex-col md:flex-row">
        <div>
          <section className="w-screen flex justify-center border-b md:hidden">
            <div>
              <img src={logo} className="w-12" />
            </div>
          </section>
          <LeftAside />
        </div>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/search" element={<Search />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
