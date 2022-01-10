import React, { useEffect, useState } from "react";
import CategoryCardComponent from "../components/Category/CategoryCardComponent.js";
import { Card, Col, Row, Button, Spinner } from "react-bootstrap";
import { ajax } from "../modules/ajax.js";
import { urls } from "../modules/urls.js";
import "../css/styles.css";

const Main = () => {
  const [category, setCategory] = useState([]);
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getCategories = async () => {
    try{
    const res = await fetch(urls.categories())
      .then((response) => {
        return response.json();
      })
      .catch(() => {
        return { resultCount: 0, results: [] };
      });
    const resN = await fetch(urls.news())
      .then((response) => {
        return response.json();
      })
      .catch(() => {
        return { resultCount: 0, results: [] };
      });
    resN.reverse();
    console.log(res, resN);
    setLastNewsPictureInCategory(resN, res);
  }
  catch{
    console.log("expect")
  }

  };

  const setLastNewsPictureInCategory = (nd, cd) => {
    console.log(nd, cd);
    cd.forEach((category) => {
      category["picture"] =
        "https://www.cbr.ru/legacy/PhotoStore/getimgid/40835.png";
      for (var i = 0; i < nd.length; i++)
        if (nd[i].category_id == category.id) {
          category["picture"] = nd[i].picture_url;
          break;
        }
    });
    console.log(nd, cd);
    setCategory(cd);
    setNews(nd);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log("Этот код выполняется только на первом рендере компонента");
    setIsLoading(true);
    // В данном примере можно наблюдать Spread syntax (Троеточие перед массивом)
    getCategories();
  }, []);

  if (isLoading) {
    return <Spinner animation="grow" />;
  } else {
    return (
      <div style={{ width: 1100, margin: "auto", top: 100 }}>
        <Row xxl={3}>
          {category.map((item, index) => {
            return <CategoryCardComponent data={item} />;
          })}
        </Row>
      </div>
    );
  }

};
export default Main;
