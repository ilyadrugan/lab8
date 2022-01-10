//import "../../css/styles.css";
import { Card, Col, Row, Button, Spinner } from "react-bootstrap";
import { CategoryPage } from "../../pages/CategoryPage.js";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const CategoryCardComponent = (data) => {
  const navigate = useNavigate();
  const handleOnClick = useCallback(() => {
    navigate("/category/" + data.data.id);
  });

  return (
    <Card
      onClick={handleOnClick}
      className="card"
      key={data.data.id}
      style={{ width: "18rem", cursor: "pointer", margin: 8 }}
    >
      <Card.Img variant="top" src={data.data.picture} width={300} />
      <Card.Body>
        <Card.Title>{data.data.name}</Card.Title>
        {/* <Card.Text>
                    {data.data.name_eng}
                </Card.Text> */}
      </Card.Body>
    </Card>
  );
};
export default CategoryCardComponent;
