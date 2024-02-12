import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Form, Alert, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';

import { To, useNavigate } from 'react-router-dom';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const navigate = useNavigate();

  const handleNavigation = (path: To) => {
    navigate(path);
  };

  const [subscriberEmail, setSubscriberEmail] = useState('');

  const [subscriberFormAlert, setSubscriberFormAlert] = useState({
    isDisplayed: false,
    text: '',
    variant: '',
  });

  const validateEmail = function (email: string) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };

  // add mailing list info from client to Atlas db
  const addToMailingList = async () => {
    console.log('aTML', subscriberEmail);
    try {
      if (validateEmail(subscriberEmail)) {
        console.log('email valid');
        await axios.post('/api/mail/addToMailList', { email: subscriberEmail });
        setSubscriberFormAlert({
          isDisplayed: true,
          text: "Thanks! You're on the list.",
          variant: 'success',
        });
      } else {
        console.log('email invalid');
        setSubscriberFormAlert({
          isDisplayed: true,
          text: 'Please submit a valid email.',
          variant: 'danger',
        });
        setSubscriberEmail('');
      }
    } catch (err) {
      console.error('CLIENT ERROR: failed to add to mail list', err);
    }
  };

  const handleMailingInfoChange = (e: any) => {
    const { name, value } = e.target;
    setSubscriberEmail(value);
  };

  return (
    <div id='login'>
      <Container id='login-container'>
        <Row>
          <Col></Col>
          <Col xs={10} className='d-flex flex-row justify-content-around'>
            <div className='d-flex flex-column mx-auto align-self-center'>
              <h1 className='mb-0'>Pardi Gras</h1>
              <h5
                className='text-center mt-0'
                style={{ fontFamily: '"Permanent Marker", serif' }}
              >
                OPEN BETA
              </h5>
            </div>
            <img
              id='login-img'
              src='img/jesterPin-1.png'
              alt='jester pin logo'
            />
          </Col>
          <Col></Col>
        </Row>
        <hr></hr>
        <Row>
          <Col>
            <h5 className='text-center' style={{color: '#8d3dad', fontWeight: '500'}}>
              Your One-Stop-Shop for Managing the Chaos of Mardi Gras
            </h5>
            <ul className='text-left'>
              <li className='login-text'>Share gossip, costumes & throws</li>
              <li className='login-text'>Drop pins to map hot commodities</li>
              <li className='login-text'>
                Find live music, parade info & make plans with your friends
              </li>
            </ul>
            <h5 className='text-center' style={{color: '#8d3dad', fontWeight: '500'}}>
              Get Involved!
            </h5>
            <p className='login-text text-left lh-sm mb-3'>
              <a href='https://docs.google.com/forms/d/e/1FAIpQLSfSGLNva3elpadLqpXw1WuD9b4H39lBuX6YMiKT5_o2DNQ7Gg/viewform'>
                Take our survey
              </a>{' '}
              or <a href='mailto:pardigrasinfo@gmail.com'>shoot us an email</a>{' '}
             with comments or questions - we'd love your feedback! Or stay in the loop by subscribing to the mailing list:
            </p>

            {/* <p>Like what you see?  Support us on <a href="https://www.kickstarter.com">Kickstarter</a></p> */}
            {/* <Button className="btn-login" style={{backgroundColor: "#e7abff" }} onClick={() => loginWithRedirect()}>Log In</Button> */}
            <Form>
              <div className='d-flex flex-row mail-list-form-items'>
                <Form.Control
                  onChange={handleMailingInfoChange}
                  type='email'
                  name='email'
                  placeholder='Email'
                  value={subscriberEmail}
                />
                <Button variant='success' onClick={addToMailingList}>
                  Subscribe
                </Button>
              </div>
              <div className='mail-list-form-items'>
                {subscriberFormAlert.isDisplayed && (
                  <Alert variant={subscriberFormAlert.variant}>
                    {subscriberFormAlert.text}
                  </Alert>
                )}
              </div>
            </Form>
            <div className='d-flex flex-column justify-content-center'>
              <Button
                className='mt-4 mb-3 px-5 mx-auto'
                variant='secondary'
                onClick={() => handleNavigation('/homepage')}
              >
                Enter Pardi Gras
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginButton;
