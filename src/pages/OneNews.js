import NewsPageComponent from "../components/News/NewsPageComponent.js";
import NewsComments from "../components/News/NewsComments.js";
import { urls } from "../modules/urls.js";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
function NewsPage(id) {
  
  console.log(id.id);
  const [news, setNews] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getNews = async () => {
    const res = await fetch(urls.news())
      .then((response) => {
        return response.json();
      })
      .catch(() => {
        return { resultCount: 0, results: [] };
      });
    res.forEach((element) => {
      if (element.id == id.id) {
        setNews(element);
      }
    });
    setIsLoading(false)
  };
  const getComments = async () => {
    console.log("заходим в getComments()");
    const res = await fetch(urls.comments())
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .catch(() => {
        console.log("error");
        return { resultCount: 0, results: [] };
      });
    var comments = [];
    console.log(res);

    res.forEach((element) => {
      if (element.news_id == id.id) {
        comments.push(element);
      }
    });
    comments.reverse();
    setComments(comments);
  };
  useEffect(() => {
    console.log("Этот код выполняется только на первом рендере компонента");
    // В данном примере можно наблюдать Spread syntax (Троеточие перед массивом)
    setIsLoading(true)
    getNews();
    getComments();
  }, []);

  return (
    <div style={{ width: 1100, margin: "auto", top: 100 }}>
     {!isLoading?( <NewsPageComponent
        title={news.title}
        description={news.description}
        image={news.picture_url}
        time={news.date_time}
      />):(<Spinner animation="grow" />)}

      <NewsComments id={news.id} commentes={comments} />

    </div>
  );
}
export default NewsPage;
