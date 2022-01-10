import CategoryPageComponent from "../components/Category/CategoryPageComponent.js";
import { ajax } from "../modules/ajax.js";
import { urls } from "../modules/urls.js";
import React, { useEffect, useState, useCallback } from "react";
import { Spinner, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function CategoryPage(id) {
  const navigate = useNavigate();
  const handleOnClick = useCallback(() => {
    navigate("/addNews");
  });
  console.log(id.id);
  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState([]);
  const addData = {
    id: "addNews",
    title: "Добавить новость",
    picture_url: "https://pngimg.com/uploads/plus/plus_PNG110.png",
    category_id: id.id,
    description: "",
    date_time: "",
  };
  const getNews = async () => {
    const res = await fetch(urls.news())
      .then((response) => {
        return response.json();
      })
      .catch(() => {
        return { resultCount: 0, results: [] };
      });
    res.reverse();
    setNews(res);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log("Этот код выполняется только на первом рендере компонента");
    setIsLoading(true);
    // В данном примере можно наблюдать Spread syntax (Троеточие перед массивом)
    getNews();
  }, []);
  if (isLoading) {
    return <Spinner animation="grow" />;
  } else {
    return (
      <div style={{ width: 1100, margin: "auto", top: 100 }}>
        {localStorage.getItem("authed") == "true" ? (
          <div className="addnews">
            <Button onClick={handleOnClick}>Добавить новость</Button>
          </div>
        ) : null}
        {news.map((item) => {
          if (item.category_id == id.id)
            return (
              <CategoryPageComponent
                title={item.title}
                description={item.description}
                image={item.picture_url}
                time={item.date_time}
                id={item.id}
                category_id={item.category_id}
              />
            );
        })}
      </div>
    );
  }
  // return (
  //   <div style={{ width: 1100, margin: "auto", top: 100 }}>
  //     {news.map((item) => {
  //       if (item.category_id == id.id)
  //         return (
  //           <CategoryPageComponent
  //             title={item.title}
  //             description={item.description}
  //             image={item.picture_url}
  //             time={item.date_time}
  //             id={item.id}
  //             category_id={item.category_id}
  //           />
  //         );
  //     })}
  //   </div>
  // );
}
export default CategoryPage;
