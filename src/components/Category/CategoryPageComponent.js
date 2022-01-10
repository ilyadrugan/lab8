import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const CategoryPageComponent = ({
  title,
  description,
  image,
  time,
  id,
  category_id,
}) => {
  const dt = new Date(time);
  console.log(dt);
  var d = dt.getDate();
  var m = dt.getMonth() + 1;
  var y = dt.getFullYear();
  var h = dt.getHours();
  var min = dt.getMinutes();
  d = d > 9 ? d : "0" + d;
  m = m > 9 ? m : "0" + m;
  h = h > 9 ? h : "0" + h;
  min = min > 9 ? min : "0" + min;
  const strDate = d + "-" + m + "-" + y + " " + h + ":" + min;

  const navigate = useNavigate();
  const handleOnClick = useCallback(() => {
    navigate("/news/"  + id);
  });

  return (
    <div className="post">
      <div
        className="post__image"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="post__info">
        <h2 className="post__title">{title}</h2>
        <div className="stop">
          <p className="post__description">{description}</p>
        </div>
        <div className="post__footer">
          <h5 className="post__next" onClick={handleOnClick}>
            Читать далее...
          </h5>
          <div>{strDate}</div>
        </div>
      </div>
    </div>
  );
};
export default CategoryPageComponent;
