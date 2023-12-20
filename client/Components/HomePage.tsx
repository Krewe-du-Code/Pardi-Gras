import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  Form,
  Button,
  Container,
  Row,
  Col,
  Tab,
  Tabs,
} from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import HomeModal from "./HomeModal";
import WeatherCard from "./WeatherCard";
import PostCard from "./PostCard";
import { ThemeContext } from './Context';

//PARENT OF HOMEMODAL

interface HomePageProps {
  lat: number
  lng: number
  userId: number
}

const HomePage: React.FC<HomePageProps> = ({ lat, lng, userId}) => {
  //const { user } = useAuth0();
  const [comment, setComment] = useState("");
  // const [userId, setUserId] = useState(null);
  const [posts, setPosts] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [key, setKey] = useState("posts");
  const theme = useContext(ThemeContext);
  
  // useEffect(() => {
  //   getLocation()
  // }, []);

  // const getUser = async () => {
  //   try {
  //     const { data } = await axios.post(`api/home/user/`, { user });
  //     setUserId(data[0].id);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  // useEffect(() => {
  //   if(userData !== null){
  //     setUserId(userData.id)
  //     getLocation()
  //   }
  // }, [userData])

  const modalTrigger = () => {
   setShowModal(true)
  }


  function handleInput(e: any) {
    setComment(e.target.value);
    console.log(comment.length);
  }

  function handleSelect(k: string){
    setKey(k);
    getPosts(k);
  }

  const handleSubmit = async() => {
    try {
      axios.post(`/api/home/${userId}`, { comment });
      setComment('');
    } catch (err) {
      console.error(err);
    } finally {
      getPosts(key);
    }
  };

  const getPosts = async (e: string) => {
    try {
      const { data } = await axios.get(`/api/home/${e}`);
      setPosts(data);
      console.log(theme);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    //getUser();
    getPosts(key);
    const interval = setInterval(() => {
      getPosts(key);
      //console.log("fetch");
    }, 5000);
    return () => clearInterval(interval);
  }, [key]);

  return (
    <Container>
      <Row>
        <h1>HomePage!</h1>
      </Row>

      <Row>
        <WeatherCard />
      <button onClick={modalTrigger}>
        Upload a pic!
      </button>
      { showModal ?
      <HomeModal
        setShowModal={setShowModal}
        lat={lat}
        lng={lng}
        userId={userId}
       />
      : null
    }
      </Row>

      <Row>
        <Tabs
          activeKey={key}
          onSelect={handleSelect}
        >
          <Tab
            eventKey="posts"
            title="All"
          >
            {posts
              ? posts.map((item: any, index: number) => (
                  <PostCard
                    key={`${item.id} + ${index}`}
                    post={item}
                    userId={userId}
                  />
                ))
              : ""}
          </Tab>
          <Tab
            eventKey="costumes"
            title="Costumes"
          >
            {posts
              ? posts.map((item: any, index: number) => (
                  <PostCard
                    key={`${item.id} + ${index}`}
                    post={item}
                    userId={userId}
                  />
                ))
              : ""}
          </Tab>
          <Tab
            eventKey="throws"
            title="Throws"
          >
            {posts
              ? posts.map((item: any, index: number) => (
                  <PostCard
                    key={`${item.id} + ${index}`}
                    post={item}
                    userId={userId}
                  />
                ))
              : ""}
          </Tab>
        </Tabs>
      </Row>

      {key === "posts" ? (
        <Row>
          <Form>
            <Form.Group>
              <Form.Label>COMMENT</Form.Label>
              <Form.Control
              onChange={handleInput}
              value={comment}
               />
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={comment.length <= 0}
              >
                SEND!!!
              </Button>
            </Form.Group>
          </Form>
        </Row>
      ) : (
        ""
      )}
    </Container>
  );
};

export default HomePage;
