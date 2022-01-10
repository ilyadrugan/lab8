import React, { useEffect, useState, useCallback } from "react";
import CategoryCardComponent from "../components/Category/CategoryCardComponent.js";
import { Card, Col, Row, Button, Spinner } from "react-bootstrap";
import { ajax } from "../modules/ajax.js";
import { urls } from "../modules/urls.js";
import { useNavigate } from "react-router-dom";
import "../css/styles.css";
const defaultAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ1aGDiyD_BYCsch4_n3_8Xp2_C6FpbyOERckn93tG3WSV98qQcMsx6ofP0UR0rrl8K7k&usqp=CAU)"
const Registration = () => {
  var arrLoginNames = [];
  const [image, setImage] = useState(defaultAvatar);
  const [category, setCategory] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlerChangeInput = () => {
    if (document.getElementById("user_img").value != "") setImage(document.getElementById("user_img").value);
    else setImage(defaultAvatar);
  };

  const navigate = useNavigate();
  const handleOnClick = useCallback(() => {
    navigate("/auth");
  });
  const getUsers = async () => {
    const res = await fetch(urls.users())
      .then((response) => {
        return response.json();
      })
      .catch(() => {
        return { resultCount: 0, results: [] };
      });
    console.log(res);
    res.forEach((element) => {
        
      arrLoginNames.push(element.loginname);
    
    });
    setUsers(arrLoginNames);

    setIsLoading(false);
  };

  const postRegist = async () => {
    if (
      document.getElementById("name").value != "" &&
      document.getElementById("loginname").value != "" &&
      document.getElementById("password").value != "" &&
      document.getElementById("passwordconfirm").value != ""
    ) {
        console.log(users)
      if (
        users.indexOf(document.getElementById("loginname").value) == -1
      ) {
        if (
          document.getElementById("password").value ==
          document.getElementById("passwordconfirm").value
        ) {
            if (document.getElementById("user_img").value.length<1024){
          const inputname = document.getElementById("name");
          const inputpicture = document.getElementById("user_img");
          const inputloginname = document.getElementById("loginname");
          const inputpassword = document.getElementById("password");
          console.log("clicked");
          setIsLoading(true);
          var data = {};
          data["name"] = inputname.value;
          if (inputpicture.value != "") data["user_img"] = inputpicture.value;
          else
            data["user_img"] = defaultAvatar
          data["loginname"] = inputloginname.value;
          data["password"] = inputpassword.value;

          
          try {
            const response = await fetch(urls.users(), {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify(data),
            });
            const result = await response.json();
            alert("Вы успешно зарегистрированы, " + data["name"] + "!");
            console.log("Успех:", JSON.stringify(result));
            setImage(defaultAvatar)
          } catch (error) {
            console.error("Ошибка:", error);
          }

          inputname.value = "";
          inputpicture.value = "";
          setIsLoading(false);
        }
        else alert("Ссылка на картинку слишком длинная, вставьте другую");
        } else alert("Пароли не совпадают!");
      } else alert("Пользователь с таким логином уже существует!");
    } else {
      alert("Заполните все поля!");
    }
  };

  useEffect(() => {
    console.log("Этот код выполняется только на первом рендере компонента");
    setIsLoading(true);
    getUsers();
    // В данном примере можно наблюдать Spread syntax (Троеточие перед массивом)
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
        <div
          style={{
            display: "flex",
            width: 600,
            margin: "auto",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 50,
          }}
        >
          <h4>Регистрация</h4>
          <Button onClick={handleOnClick}>У меня есть аккаунт</Button>
        </div>
        <input
          style={{ marginTop: 10 }}
          id="loginname"
          placeholder="Введите логин..."
          // onChange={handlerChangeInput}
        />
        <input
          style={{ marginTop: 10 }}
          id="name"
          placeholder="Введите ваше имя..."
          // onChange={handlerChangeInput}
        />
        <input
          style={{ marginTop: 10 }}
          type="password"
          id="password"
          placeholder="Введите пароль..."
          // onChange={handlerChangeInput}
        />
        <input
          style={{ marginTop: 10 }}
          type="password"
          id="passwordconfirm"
          placeholder="Введите пароль ещё раз..."
          // onChange={handlerChangeInput}
        />
        <div
          style={{
            display: "flex",
            width: 600,
            flexDirection: "row",
            justifyContent:"space-between",
            marginTop: 10,
          }}
        >
          <input
            style={{ width: 530, height: 30, marginTop: 15 }}
            id="user_img"
            placeholder="Вставьте ссылку на картинку..."
            onChange={handlerChangeInput}
          />
          
          <img
            className="avatar"
            width={60}
            src={image}
          />
        </div>
        <Button
          style={{ marginTop: 10 }}
          onClick={postRegist}
          variant="outline-success"
        >
          Зарегистрироваться
        </Button>
      </div>
    );
  }

  // return (
  //   <div style={{width:1100,margin: "auto", top:100}}>
  //   <Row xxl={3} >

  //       {category.map((item, index) => {
  //         return <CategoryCardComponent data={item} />;
  //       })}
  //   </Row>
  //   </div>
  // );
};
export default Registration;
