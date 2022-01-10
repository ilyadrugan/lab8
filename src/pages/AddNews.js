import { ajax } from "../modules/ajax.js";
import { urls } from "../modules/urls.js";
import React, { useEffect, useState, useCallback } from "react";
import { Spinner, Button } from "react-bootstrap";
import { Alert } from "bootstrap";
import { useNavigate } from "react-router-dom";
const AddNews = () => {
    const navigate = useNavigate();
    const handleOnClick = useCallback(() => {
      navigate("/addNews");
    });
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [category, setCategory] = useState([]);

  const postNews = async () => {
      console.log(document.getElementById("title").value)
      console.log(document.getElementById("picture_url").value)
      console.log(document.getElementById("desсription").value)
      console.log(document.getElementById("categoryselector").value)
    if (
      document.getElementById("title").value != "" &&
      document.getElementById("picture_url").value != "" &&
      document.getElementById("desсription").value != "" &&
      document.getElementById("categoryselector").value != ""
    ) {
      const inputname = document.getElementById("title");
      const inputpicture = document.getElementById("picture_url");
      const inputdesсription = document.getElementById("desсription");
      const selectcategory = document.getElementById("categoryselector");
      setIsLoading(true);
      var data = {};
      data["title"] = inputname.value;
      data["picture_url"] = inputpicture.value;
      data["description"] = inputdesсription.value;
      data["category_id"] = selectcategory.value;
      data["date_time"]=new Date();
      console.log(data);
      try {
        const response = await fetch(urls.news(), {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log("Успех:", JSON.stringify(result));
        alert("Новость успешно добавлена");
        window.location.reload();
      } catch (error) {
        console.error("Ошибка:", error);
      }
      
      setIsLoading(false);
    } else {
      alert("Заполните все поля!");
    }
  };
  const getCategories = async () => {
    console.log(isLoading);

    const res = await fetch(urls.categories())
      .then((response) => {
        setIsLoading(false);
        return response.json();
      })
      .catch(() => {
        return { resultCount: 0, results: [] };
      });
    console.log(res, isLoading);
    setCategory(res);
  };
  useEffect(() => {
    console.log("Этот код выполняется только на первом рендере компонента");
    // В данном примере можно наблюдать Spread syntax (Троеточие перед массивом)
    getCategories();
  }, []);
  if (isLoading) {
    return <Spinner animation="grow" />;
  } else {
    return (
      <div
        style={{
          display: "flex",
          width: 600,
          margin: "auto",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <h4 style={{ marginTop: 50 }}>Добавление новости</h4>
        <input
          style={{ marginTop: 10 }}
          id="title"
          placeholder="Заголовок новости"
          // onChange={handlerChangeInput}
        />
        <input
          style={{ marginTop: 10 }}
          id="picture_url"
          placeholder="Вставьте ссылку на картинку"
          // onChange={handlerChangeInput}
        />
        <input
          style={{ marginTop: 10 }}
          id="desсription"
          placeholder="Описание"
          // onChange={handlerChangeInput}
        />
        <select id="categoryselector" required style={{ marginTop: 10 }}>
          <option selected disabled>
            Выберите категорию
          </option>
          {category.map((item, index) => {
            // if (item.id==marka_id) setSelectedMark(true);
            // else setSelectedMark(false);
            return (
              <option value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
        <Button
          style={{ marginTop: 10 }}
          onClick={postNews}
          variant="outline-success"
        >
          Добавить новость
        </Button>
      </div>
    );
  }
};

export default AddNews;
