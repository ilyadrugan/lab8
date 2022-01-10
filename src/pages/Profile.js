import { Button } from "react-bootstrap";
import React, { useEffect, useState,useCallback } from "react";
import { Alert } from "bootstrap";

const defaultAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ1aGDiyD_BYCsch4_n3_8Xp2_C6FpbyOERckn93tG3WSV98qQcMsx6ofP0UR0rrl8K7k&usqp=CAU)"

const userAnonymous = {
    loginname:"Anonymous",
    password:"",
    name:"Аноним",
    user_img:defaultAvatar
  }
  const exit = () =>{
    localStorage.setItem("curUser", JSON.stringify(userAnonymous));
    localStorage.setItem("authed","false");
    window.location.reload();
    alert("Выход выполнен!")
}
const Profile = ({curUser }) => {
    //const [disabled, setDisabled] = useState(true)
   var loginname, username, user_img;
  if (curUser == undefined){ loginname = "Anonymous";username = "Аноним";user_img = defaultAvatar;}
  else {
    loginname = curUser.loginname;username = curUser.name;user_img = curUser.user_img;
  }

  return (
    <div style={{ width: 500, margin: "auto", top: 100 }}>
      <div className="rowblockComment">
        <img
          width={100}
          height={100}
          src={user_img}
        />
        <div className="columnblockNameTime">
          <div className="rowblockNameTime">
            <h7 className="commentName">Ваш логин: {loginname}</h7>
          </div>
          <div className="textcomment">Ваше имя: {username}</div>
        </div>
      </div>
      <Button onClick={exit} disabled={false}>Выйти</Button>
    </div>
  );
};

export default Profile;
