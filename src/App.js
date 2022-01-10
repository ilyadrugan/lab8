import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Main from "./pages/Main.js";
import Login from "./pages/Login.js";
import AddNews from "./pages/AddNews.js";
import Profile from "./pages/Profile.js";
import Registration from "./pages/Registration.js";
import CategoryPage from "./pages/CategoryPage.js";
import OneNews from "./pages/OneNews.js";
import Navbar from "./components/NavBar/Navbar";
import { urls } from "./modules/urls.js";
import { Spinner } from "react-bootstrap";

function App() {
  const curUser = JSON.parse(localStorage.getItem("curUser"));
  const [category, setCategory] = useState([]);
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCategories = async () => {
    console.log(isLoading);
    const res = await fetch(urls.categories())
      .then((response) => {
        setIsLoading(false)
        return response.json();
      })
      .catch(() => {
        return { resultCount: 0, results: [] };
      });

    console.log(res, isLoading);
    setCategory(res);
  };
  const getNews = async () => {
    console.log(isLoading);

    const res = await fetch(urls.news())
      .then((response) => {
        setIsLoading(false);
        return response.json();
      })
      .catch(() => {
        return { resultCount: 0, results: [] };
      });
    console.log(res, isLoading);
    setNews(res);
  };
  useEffect(() => {
    console.log("Этот код выполняется только на первом рендере компонента");
    setIsLoading(true);
    // В данном примере можно наблюдать Spread syntax (Троеточие перед массивом)
    getCategories();
    getNews();
  }, []);
  return (
    <BrowserRouter basename="/">
      <Navbar />
      <div>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/auth" element={<Login />} />
          <Route exact path="/auth/registration" element={<Registration />} />
          <Route exact path="/profile" element={<Profile curUser={curUser}/>} />
          <Route exact path="/addNews" element={<AddNews news={news}/>} />
          {!isLoading
            ? category.map((item, index) => {
                var path = "/category/" + item.id;
                return (
                  <Route path={path} element={<CategoryPage id={item.id} />} />
                );
              })
            : null}
          {!isLoading
            ? news.map((item, index) => {
                var path = "/news/" + item.id;
                return <Route path={path} element={<OneNews id={item.id} />} />;
              })
            : null}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
