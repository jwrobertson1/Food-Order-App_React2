import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ItemCard from "../../components/ItemCard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listRestaurants } from "../../actions/restaurantActions";

import AlertMessage from "../../components/AlertMessage";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [restaurantsList, setRestaurantsList] = useState();

  const listOfRestaurants = useSelector((state) => state.restaurantList);
  const { loadingRestaurants, successRestaurants, errorRestaurants, restaurants } = listOfRestaurants;

  const userLogin = useSelector((state) => state.login);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (userInfo) {
      navigate("/");
      dispatch(listRestaurants());
    } else {
      navigate("/login");
    }
  },[])


  useEffect(() => {


    if (restaurants && restaurants.length > 0) {
      console.log(restaurants);
      setRestaurantsList(restaurants);
    }
  });

  return (
    <>
      {loadingRestaurants && <Spinner animation="grow" />}
      {restaurantsList && restaurantsList.length === 0 && (
        <AlertMessage variant="info" message="No restaurants to display" />
      )}
      {restaurantsList && (
        <div className="container-fluid">
          <h4>Available restaurants</h4>
          <Row className="g-4">
            {restaurantsList.map((restaurant) => (
              <Col key={restaurant._id} md={6} sm={12} lg={4}>
                <ItemCard item={restaurant} itemName="restaurant" />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </>
  );
};

export default HomePage;
