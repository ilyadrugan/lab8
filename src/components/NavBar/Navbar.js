import React, { useEffect, useState, useCallback } from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavBarElements.js";
import { ajax } from "../../modules/ajax.js";
import { urls } from "../../modules/urls.js";
import { CategoryPage } from "../../pages/CategoryPage.js";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



const Navbar = () => {
   const curUser = localStorage.getItem("curUser");
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const defaultAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ1aGDiyD_BYCsch4_n3_8Xp2_C6FpbyOERckn93tG3WSV98qQcMsx6ofP0UR0rrl8K7k&usqp=CAU)"
  //const [image, setImage] = useState(defaultAvatar);
  const userAnonymous = {
    loginname:"Anonymous",
    password:"",
    name:"Аноним",
    user_img:defaultAvatar
  }
  //setUser(JSON.parse(curUser))
  const [user, setUser]=useState(userAnonymous)
 

  const getCategory = async () => {
    const res = await fetch(urls.categories())
      .then((response) => {
        setIsLoading(false);
        return response.json();
      })
      .catch(() => {
        return { resultCount: 0, results: [] };
      });
    console.log(res);
    setCategory(res);

    return res;
  };
  const navigate = useNavigate();
  
    const handleOnClick = useCallback(() => {
      navigate("/profile");
    });

  useEffect(() => {
    //console.log('Этот код выполняется только на первом рендере компонента')
    // В данном примере можно наблюдать Spread syntax (Троеточие перед массивом)
    setIsLoading(true);
    if (localStorage.getItem("authed")=="true"){
      console.log(curUser)
      setUser(JSON.parse(curUser))
    }
    else{
      setUser(userAnonymous)
    }
    getCategory();
  }, []);

  return (
    <>
      <Nav>
      <img
      onClick={handleOnClick}
            className="avatar"
            style={{cursor:"pointer"}}
            width={60}
            src={user.user_img}
          />
        <Bars />
        <NavMenu>
          {!isLoading ? (
            category.map((item, index) => {
              var tolink = "/category/" + item.id;
              return (
                <NavLink to={tolink} activeStyle>
                  {item.name}
                </NavLink>
              );
            })
          ) : (
            <Spinner animation="grow" />
          )}
          {/* {category.map((item, index) => {
          var tolink='/category/'+item.id;
          return(
          <NavLink to={tolink}  activeStyle>
          {item.name}
        </NavLink>)
        })} */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/">Главная</NavBtnLink>
          <NavBtnLink to="/auth">Вход</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
