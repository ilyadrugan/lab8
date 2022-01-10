import React, { useEffect, useState, useCallback } from "react";
import CategoryCardComponent from "../components/Category/CategoryCardComponent.js";
import { Card, Col, Row, Button, Spinner } from "react-bootstrap";
import { ajax } from "../modules/ajax.js";
import { urls } from "../modules/urls.js";
import { useNavigate } from "react-router-dom";
import "../css/styles.css";

const Login = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleOnClick = useCallback(() => {
    navigate("/auth/registration");
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

    // var arrLoginNames=[]
    // res.forEach((element) => {
    //   var data ={}
    //   data["loginname"]=element.loginname;
    //   data["loginname"]=element.password;
    //   arrLoginNames.push(data);

    // });
    setUsers(res);

    setIsLoading(false);
  };

  const postLogin = async () => {
    if (
      document.getElementById("loginname").value != "" &&
      document.getElementById("password").value != ""
    ) {
      const inputloginname = document.getElementById("loginname");
      const inputpassword = document.getElementById("password");
      console.log("clicked");
      setIsLoading(true);
      var data = {};

      data["loginname"] = inputloginname.value;
      data["password"] = inputpassword.value;
      users.forEach(element => {
        if(data["loginname"]==element.loginname&&data["password"]==element.password){
          alert("Вход выполнен!");
          inputloginname.value = "";
          inputpassword.value = "";
          localStorage.setItem("curUser",JSON.stringify(element))
          localStorage.setItem("authed","true")
          window.location.reload();
          setIsLoading(false);
          
        }
        
      });
      if(inputloginname.value != "") alert("Неверный логин или пароль!");
      setIsLoading(false);
      const cur = localStorage.getItem("curUser")
      console.log(JSON.parse(cur))
    } else {
      alert("Заполните все поля!");
    }
  };

  useEffect(() => {
    console.log("Этот код выполняется только на первом рендере компонента");
    //setIsLoading(true);
    // В данном примере можно наблюдать Spread syntax (Троеточие перед массивом)
    getUsers();
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
          <h4>Вход</h4>
          <Button onClick={handleOnClick}>Нет аккаунта?</Button>
        </div>
        <input
          style={{ marginTop: 10 }}
          id="loginname"
          placeholder="Введите ваш логин..."
          // onChange={handlerChangeInput}
        />
        <input
          style={{ marginTop: 10 }}
          type="password"
          id="password"
          placeholder="Введите пароль..."
          // onChange={handlerChangeInput}
        />

        <Button
          style={{ marginTop: 10 }}
          onClick={postLogin}
          variant="outline-success"
        >
          Войти
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
export default Login;
