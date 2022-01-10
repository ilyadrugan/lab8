import { urls } from "../../modules/urls.js";
import { ajax } from "../../modules/ajax.js";
import { Spinner } from "react-bootstrap";
import CommentComponent from "../Comment/Comment.js";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const NewsCommentsComponent = ({ id, commentes }) => {
  const curUser = JSON.parse(localStorage.getItem("curUser"));
  const defaultAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ1aGDiyD_BYCsch4_n3_8Xp2_C6FpbyOERckn93tG3WSV98qQcMsx6ofP0UR0rrl8K7k&usqp=CAU)"

  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const inputname = document.getElementById("inputname");
  const inputtext = document.getElementById("inputtext");
  const [auth, setAuth] = useState("");
  useEffect(() => {
    console.log("Этот код выполняется только на первом рендере компонента");
    setAuth(localStorage.getItem("authed"));
    // В данном примере можно наблюдать Spread syntax (Троеточие перед массивом)
    //getComments();
    //setComments(commentes);
  }, []);

  const handlerChangeInput = () => {
    if (auth !== "true") {
      if (
        document.getElementById("inputname").value != "" &&
        document.getElementById("inputtext").value != ""
      )
        setDisabled(false);
    } else if (auth == "true") {
      if (document.getElementById("inputtext").value != "") {
        console.log(document.getElementById("inputtext").value);
        setDisabled(false);
      }
    } else setDisabled(true);
  };

  const sendComment = async () => {
    if (
       document.getElementById("inputtext").value != ""
    ) {
      console.log("clicked");
      setIsLoading(true);
      var date = new Date();
      console.log(date);
      var data = {};
      //data["id"]=1;
      inputname==null?data["name"]=curUser.name:data["name"] = inputname.value;
      data["text"] = inputtext.value;
      auth?data["user_img"] = curUser.user_img:data["user_img"]=defaultAvatar;
      data["news_id"] = id;
      data["date_time"] = date;
      console.log(data);
      try {
        const response = await fetch(urls.comments(), {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        });
        const result = await response.json();
        commentes.unshift(result);
        // setTimeout(setComments(commentes), 1000);
        console.log("Успех:", JSON.stringify(result));
      } catch (error) {
        console.error("Ошибка:", error);
      }

     
      inputtext.value = "";
      setIsLoading(false);
    } else alert("Введите хотя бы 1 символ");
  };

  return (
    <div className="comments">
      <div className="rowblock">
        <img
          width={60}
          height={60}
          className="avatar"
          
          src={curUser.user_img}
        />
        <div className="columnblock">
          {localStorage.getItem("authed") !== "true" ? (
            <input
              className="inputstyle"
              placeholder="Представьтесь..."
              id="inputname"
              onChange={handlerChangeInput}
            />
          ) : null}
          <input
            className="inputstyle"
            placeholder="Оставьте комментарий..."
            id="inputtext"
            onChange={handlerChangeInput}
          />
        </div>
      </div>
      
      <Button
        onClick={sendComment}
        variant="outline-success"
        disabled={disabled}
      >
        Отправить комментарий
      </Button>

      {!isLoading ? (
        commentes.map((item) => {
          return (
            <CommentComponent
              name={item.name}
              text={item.text}
              time={item.date_time}
              user_img={item.user_img}
            />
          );
        })
      ) : (
        <Spinner animation="grow" />
      )}
    </div>
  );
};
export default NewsCommentsComponent;
