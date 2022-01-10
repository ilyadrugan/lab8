import React, { useEffect, useState } from "react";
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import ru from 'timeago.js/lib/lang/ru';
timeago.register('ru', ru);
const CommentComponent = ({ name, text, time, user_img }) => {
  // console.log(time);
  //   const dt = new Date(time);
  //   console.log(dt);
  //   var d = dt.getDate();
  //   var m = dt.getMonth() + 1;
  //   var y = dt.getFullYear();
  //   var h = dt.getHours();
  //   var min = dt.getMinutes();
  //   d = d > 9 ? d : "0" + d;
  //   m = m > 9 ? m : "0" + m;
  //   h = h > 9 ? h : "0" + h;
  //   min = min > 9 ? min : "0" + min;
  //   const strDate = d + "-" + m + "-" + y + " " + h + ":" + min;

  return (
    <div className="rowblockComment">
      <img
      className="avatar"
        width={60}
        height={60}
        src={user_img}
      />
      <div className="columnblockNameTime">
        <div className="rowblockNameTime">
          <h7 className="commentName">{name}</h7>
          <TimeAgo 
          className="timego"
          datetime={time}
          locale='ru'
          />
        </div>
        <div className="textcomment">{text}</div>
      </div>
    </div>
  );
};
export default CommentComponent;
