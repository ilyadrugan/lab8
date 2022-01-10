import React, { useEffect, useState } from "react";


const parseTime = (time) => {
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
  return strDate;
};

const NewsPageComponent = ({ title, description, image, time }) => {

  const t = parseTime(time);
  return (
    <div className="post_inside">
      <div className="post__info">
        <h2 className="post__title">{title}</h2>
        <img style={{ width: 300 }} src={image} />
        <p>{description}</p>
        <div>{t}</div>
      </div>
    </div>
  );
};
export default NewsPageComponent;
