import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EventBasicModal from './EventBasicModal';
import EventCreateModal from './EventCreateModal';
import ConfirmActionModal from './ConfirmActionModal';
import {
  Button,
  Container,
  Row,
  Tab,
  Tabs,
  Dropdown,
  DropdownButton,
  Modal,
  Alert
} from 'react-bootstrap';

import { MdCancel } from '@react-icons/all-files/md/MdCancel';
import { IoPersonRemoveSharp } from '@react-icons/all-files/io5/IoPersonRemoveSharp';

import { FaThumbsUp } from '@react-icons/all-files/fa/FaThumbsUp';

import { FaThumbsDown } from '@react-icons/all-files/fa/FaThumbsDown';

import { FaEnvelope } from '@react-icons/all-files/fa/FaEnvelope';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(relativeTime);
dayjs.extend(isBetween);
import { useAuth0 } from '@auth0/auth0-react';
import { ThemeContext, RunModeContext } from './Context';
import { ToastContainer, toast } from 'react-toastify';

const UserPage: React.FC<UserPageProps> = ({
  userId, lng,
  lat,
  setTheme,
  setConfirmActionBundle
}) => {
  // const [searchParams] = useSearchParams();
  // const [userId] = useState(Number(searchParams.get('userid')) || 1);

  const [friends, setFriends] = useState([]); // array of user id's
  const [friendRequestsMade, setFriendRequestsMade] = useState([]);
  const [friendRequestsReceived, setFriendRequestsReceived] = useState([]);
  const [eventsParticipating, setEventsParticipating] = useState([
    { name: 'default' },
  ]);
  const [eventsInvited, setEventsInvited] = useState([
    {
      event: { name: 'default' },
      sender: 'default sender',
    },
  ]);
  const [eventsOwned, setEventsOwned] = useState([{ name: 'default' }]);

  const [nameOrPhoneForFriendRequest, setNameOrPhoneForFriendRequest] =
    useState('');

  const [selectedEvent, setSelectedEvent] = useState({
    latitude: 0,
    longitude: 0,
    startTime: null,
    endTime: null,
  }); // default to make modals happy

  const [isUserAttending, setIsUserAttending] = useState(false); // this gets passed to basic modal to expose invite functionality
  const [showBasicModal, setShowBasicModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [isNewEvent, setIsNewEvent] = useState(false);

  // const [showGif, setShowGif] = useState(false);

  const theme = useContext(ThemeContext);
  const isDemoMode = useContext(RunModeContext) === 'demo';

  const [showAboutModal, setShowAboutModal] = useState(true);

  const toggleAboutModal = () => {
    setShowAboutModal(!showAboutModal);
  };

  // logout functionality via auth0
  const { logout } = useAuth0();

  const getFriends = async () => {
    try {
      const friends = await axios.get(`/api/friends/getFriends/${userId}`);
      setFriends(friends.data);
    } catch (err) {
      console.error('CLIENT ERROR: failed to GET user friends', err);
    }
  };

  const getEventsOwned = async () => {
    try {
      const eventsOwned = await axios.get(
        `api/events/getEventsOwned/${userId}`
      );
      setEventsOwned(eventsOwned.data);
    } catch (err) {
      console.error('CLIENT ERROR: failed to get events owned', err);
    }
  };

  const getEventsParticipating = async () => {
    try {
      const eventsParticipating = await axios.get(
        `api/events/getEventsParticipating/${userId}`
      );
      setEventsParticipating(eventsParticipating.data);
    } catch (err) {
      console.error(
        "CLIENT ERROR: failed to GET user's participating events",
        err
      );
    }
  };

  const getEventsInvited = async () => {
    try {
      const eventsInvited = await axios.get(
        `api/events/getEventsInvited/${userId}`
      );

      setEventsInvited(eventsInvited.data);
    } catch (err) {
      console.error(
        "CLIENT ERROR: failed to GET user's event invitations",
        err
      );
    }
  };

  const getFriendRequests = async () => {
    try {
      const friendRequestsData = await axios.get(
        `api/friends/getFriendRequests/${userId}`
      );
      const { requestsMadeUsers, requestsReceivedUsers } =
        friendRequestsData.data;
      setFriendRequestsReceived(requestsReceivedUsers);
      setFriendRequestsMade(requestsMadeUsers);
    } catch (err) {
      console.error('CLIENT ERROR: could not GET friend requests ', err);
    }
  };

  // POPULATES USERPAGE WITH CORRECT PEOPLE, EVENTS
  // isNewEvent is switched to false
  // whenever modal closes, so this
  // uE runs whenever a modal closes,
  // to refresh info
  useEffect(() => {
    if (isNewEvent === false && userId !== null) {
      getFriends();
      getEventsOwned();
      getEventsParticipating();
      getEventsInvited();
      getFriendRequests();
    }
  }, [userId, isNewEvent]);

  // ALL RENDERED DATA ARE IN LIST ITEMS
  let userFriendsItems = null;
  if (friends.length > 0) {
    userFriendsItems = friends.map((friend: any, index: number) => {
      return (
        <div className='d-flex mb-1' key={index}>
          <div className='flex-grow-1  mx-5'>
            {friend.firstName} {`${friend.lastName.slice(0, 1)}.`}
          </div>
          <div className='mx-5'>
            <Button
              size='sm'
              variant='danger'
              onClick={async () => {
                await setConfirmActionBundle.setConfirmActionFunction(() => () => unfriend(friend.id));
                await setConfirmActionBundle.setConfirmActionText(
                  `remove ${friend.firstName} from your krewe.`
                );
                await setConfirmActionBundle.setShowConfirmActionModal(true);
              }}
              disabled={isDemoMode}
            >
              {/*'REMOVE '*/}{' '}
              <IoPersonRemoveSharp style={{ verticalAlign: '-2px' }} />
            </Button>
          </div>
        </div>
      );
    });
  }

  let requestsMadeItems = null;
  if (friendRequestsMade.length > 0) {
    requestsMadeItems = friendRequestsMade.map((requestee, index: number) => {
      return (
        <div className='d-flex mb-1' key={index}>
          <div className='flex-grow-1  mx-5'>
            {requestee.firstName} {`${requestee.lastName.slice(0, 1)}.`}
          </div>
          <div className='mx-5'>
            <Button
              variant='danger'
              size='sm'
              // onClick={() => cancelFriendRequest(requestee.id)}
              onClick={async () => {
                await setConfirmActionBundle.setConfirmActionFunction(
                  () => () => cancelFriendRequest(requestee.id)
                );
                await setConfirmActionBundle.setConfirmActionText(
                  `revoke your krewe invitation to ${requestee.firstName}.`
                );
                await setConfirmActionBundle.setShowConfirmActionModal(true);
              }}
              disabled={isDemoMode}
            >
              <MdCancel style={{ verticalAlign: '-2px' }} />
            </Button>
          </div>
        </div>
      );
    });
  }

  let requestsReceivedItems = null;
  if (friendRequestsReceived.length > 0) {
    requestsReceivedItems = friendRequestsReceived.map((requester, index) => {
      return (
        <div className='d-flex mb-1' key={index}>
          <div className='flex-grow-1  mx-5'>
            {requester.firstName} {`${requester.lastName.slice(0, 1)}.`}
          </div>
          <div className='mx-5'>
            <Button
              className='mx-1'
              size='sm'
              variant='success'
              onClick={() => answerFriendRequest(requester.id, true)}
            >
              <FaThumbsUp style={{ verticalAlign: '-2px' }} />
            </Button>
            <Button
              className='mx-1'
              size='sm'
              variant='danger'
              // onClick={() => answerFriendRequest(requester.id, false)}
              onClick={async () => {
                await setConfirmActionBundle.setConfirmActionFunction(
                  () => () => answerFriendRequest(requester.id, false)
                );
                await setConfirmActionBundle.setConfirmActionText(
                  `reject ${requester.firstName}'s krewe invitation.`
                );
                await setConfirmActionBundle.setShowConfirmActionModal(true);
              }}
            >
              <FaThumbsDown style={{ verticalAlign: '-2px' }} />
            </Button>
          </div>
        </div>
      );
    });
  }

  // for displaying and styling time info
  const now = dayjs();

  let eventsOwnedItems = null;
  if (eventsOwned.length > 0) {
    eventsOwnedItems = eventsOwned.map((event: any, index: number) => {
      return (
        <div
          key={index}
          onClick={() => {
            setIsNewEvent(false);
            setIsUserAttending(true);
            setShowCreateModal(true);
            setSelectedEvent(event);
          }}
          style={{
            textDecoration: now.isAfter(event.endTime)
              ? 'line-through'
              : 'none',
          }}
        >
          <b>{event.name} </b>
          {now.isBetween(event.startTime, event.endTime) ? (
            <em> happening now</em>
          ) : now.isBefore(event.startTime) ? (
            <em> starts {now.to(dayjs(event.startTime))}</em>
          ) : (
            <em> ended {now.to(dayjs(event.endTime))}</em>
          )}
        </div>
      );
    });
  }

  let eventsParticipatingItems = null;
  if (eventsParticipating.length > 0) {
    eventsParticipatingItems = eventsParticipating.map(
      (event: any, index: number) => {
        return (
          <div
            key={index}
            onClick={() => {
              setIsNewEvent(false);
              setIsUserAttending(true);
              setShowBasicModal(true);
              setSelectedEvent(event);
            }}
            style={{
              textDecoration: now.isAfter(event.endTime)
                ? 'line-through'
                : 'none',
            }}
          >
            <b>{event.name} </b>
            {now.isBetween(event.startTime, event.endTime) ? (
              <em> happening now</em>
            ) : now.isBefore(event.startTime) ? (
              <em> starts {now.to(dayjs(event.startTime))}</em>
            ) : (
              <em> ended {now.to(dayjs(event.endTime))}</em>
            )}
          </div>
        );
      }
    );
  }

  let eventsInvitedItems = null;
  if (eventsInvited.length > 0) {
    eventsInvitedItems = eventsInvited.map((invitation: any, index: number) => {
      return (
        <div
          key={index}
          onClick={() => {
            setIsNewEvent(false);
            setIsUserAttending(false);
            setShowBasicModal(true);
            setSelectedEvent(invitation.event);
          }}
          style={{
            textDecoration: now.isAfter(invitation.event.endTime)
              ? 'line-through'
              : 'none',
          }}
        >
          <b>{invitation.event.name} </b>

          {now.isBetween(
            invitation.event.startTime,
            invitation.event.endTime
          ) ? (
            <em> happening now</em>
          ) : now.isBefore(invitation.event.startTime) ? (
            <em> starts {now.to(dayjs(invitation.event.startTime))}</em>
          ) : (
            <em> ended {now.to(dayjs(invitation.event.endTime))}</em>
          )}

          <br />
          {`Invited by ${invitation.sender}`}
        </div>
      );
    });
  }

  // FUNCTIONS FOR DATA ITEMS
  // FRIENDS
  const requestFriend = async () => {
    try {
      // checking for phoneNumber
      let phoneForFriendRequest = '';
      let nameForFriendRequest = '';

      if (nameOrPhoneForFriendRequest.indexOf('-') !== -1) {
        phoneForFriendRequest = nameOrPhoneForFriendRequest;
      } else if (nameOrPhoneForFriendRequest.indexOf(' ') !== -1) {
        nameForFriendRequest = nameOrPhoneForFriendRequest;
      }

      const friendRequestResponse = await axios.post(
        '/api/friends/requestFriend',
        {
          friendRequest: {
            requester_userId: userId,
            recipient_phoneNumber: phoneForFriendRequest,
            recipient_name: nameForFriendRequest,
          },
        }
      );

      setNameOrPhoneForFriendRequest('');
      getFriendRequests();
      toast('🎭 Krewe invite sent! 🎭', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (err) {
      console.error('CLIENT ERROR: failed to POST friend request', err);
    }
  };

  const cancelFriendRequest = async (recipient_userId: number) => {
    const deleteResponse = await axios.delete(
      `/api/friends/cancelFriendRequest/${userId}-${recipient_userId}`
    );
    getFriendRequests();
  };

  const answerFriendRequest = async (
    requester_userId: number,
    isConfirmed: boolean
  ) => {
    try {
      const updatedRelationship = await axios.patch(
        '/api/friends/answerFriendRequest',
        {
          answer: {
            requester_userId,
            recipient_userId: userId,
            isConfirmed,
          },
        }
      );
      getFriends();
      getFriendRequests();
      if (isConfirmed === true) {
        toast('🎭 Krewe invite accepted! 🎭', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (err) {
      console.error('CLIENT ERROR: failed to answer friend request', err);
    }
  };

  const unfriend = async (friendId: number) => {
    const deleteResponse = await axios.delete(
      `/api/friends/unfriend/${userId}-${friendId}`
    );
    getFriends();
  };

  const handleNameOrPhoneInput = (e: any) => {
    setNameOrPhoneForFriendRequest(e.target.value);
  };

  // const handleDeepGrasMode = () => {
  //   setTheme('pg-theme-deep');

  //   setShowGif(true);

  //   setTimeout(() => setShowGif(false), 5000);
  // };

  return (
    <Container className={`body ${theme} user-page-container`}>
      {/* {showGif && (
        <img
          src='/img/mardi-gras.gif'
          alt='Mardi Gras GIF'
          style={{
            width: '100%',
            height: 'auto',
            position: 'absolute',
            top: '15%',
            zIndex: '1',
          }}
        />
      )} */}

      {isDemoMode && (
        <Modal show={showAboutModal} onHide={toggleAboutModal}>
          <Modal.Header closeButton>
            <Modal.Title>DEMO MODE: Krewe & Calendar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className='fs-6 lh-sm'>
              <b>Welcome to the Krewe & Calendar page!</b>
              <br />
              <br />
              Here you&apos;ll add friends to your Krewe and organize custom
              events. Navigate between the &apos;Krewe&apos; and
              &apos;Calendar&apos; tabs to display your connections or relevant
              events.
              <br />
              <br />
              Click &apos;Make Plans&apos; to create an event from scratch,
              &apos;Live Music&apos; to view an up-to-date NOLA music calendar,
              and &apos;Parades&apos; to discover details about upcoming Mardi
              Gras parades.
              <br />
              <br />
              <b>Before you go!</b> Please take the{' '}
              <a href='https://docs.google.com/forms/d/e/1FAIpQLSfSGLNva3elpadLqpXw1WuD9b4H39lBuX6YMiKT5_o2DNQ7Gg/viewform'>
                Survey
              </a>{' '}
              and let us know what you think.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={toggleAboutModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />

      <EventBasicModal
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        setShowBasicModal={setShowBasicModal}
        showBasicModal={showBasicModal}
        friends={friends}
        userId={userId}
        isUserAttending={isUserAttending}
        setIsUserAttending={setIsUserAttending}
        getEventsInvited={getEventsInvited}
        getEventsParticipating={getEventsParticipating}
      />

      <EventCreateModal
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        setShowCreateModal={setShowCreateModal}
        showCreateModal={showCreateModal}
        friends={friends}
        userId={userId}
        isNewEvent={isNewEvent}
        setIsNewEvent={setIsNewEvent}
        lat={lat}
        lng={lng}
        eventType={'user'}
        getEventsOwned={getEventsOwned}
      />

      <Row>
        <div
          className='d-flex flex-column justify-content-between'
          style={{ height: '75vh' }}
        >
          <div className='user-page-tabs my-3'>
            <Tabs defaultActiveKey='krewe'>
              <Tab eventKey='krewe' title='Krewe'>
                <h5> Krewe </h5>
                {friends.length > 0 ? (
                  <div className='m-2'>{userFriendsItems}</div>
                ) : (
                  <>
                    <div className='ep-card-content text-center'>
                      You&apos;re flying solo!
                    </div>
                    <div className='ep-card-detail text-center'>
                      Assemble your krewe by searching for friends below
                    </div>
                  </>
                )}

                <div className='d-flex flex-column align-items-center p-2'>
                  <input
                    style={{ width: '50vw' }}
                    placeholder='Search by First & Last Name'
                    value={nameOrPhoneForFriendRequest}
                    onChange={handleNameOrPhoneInput}
                  ></input>

                  <div className='d-flex flew-row m-2'>
                    <div className='mx-1'>Invite to Krewe</div>
                    <Button
                      className='mx-1'
                      size='sm'
                      variant='primary'
                      onClick={requestFriend}
                      disabled={isDemoMode}
                    >
                      <FaEnvelope style={{ verticalAlign: '-2px' }} />
                    </Button>
                  </div>
                </div>

                {
                  // conditional checks for outgoing requests
                  friendRequestsMade.length > 0 && (
                    <>
                      <h5> Waiting on... </h5>
                      <div className='m-2'>{requestsMadeItems}</div>
                    </>
                  )
                }

                {
                  // conditional checks for incoming requests
                  friendRequestsReceived.length > 0 && (
                    <>
                      <h5> Respond to... </h5>
                      <div className='m-2'>{requestsReceivedItems}</div>
                    </>
                  )
                }
              </Tab>

              <Tab eventKey='calendar' title='Calendar'>
                {
                  // conditional check: if no events owned or invited or attending, show default message
                  eventsOwned.length === 0 &&
                    eventsInvited.length === 0 &&
                    eventsParticipating.length === 0 && (
                      <Alert variant='danger' className='mt-3 text-center'>
                        <Alert.Heading >Nothing going on here!</Alert.Heading>
                        <p>Make plans or connect with your krewe to beef up your calendar.</p>
                      </Alert>
                    )
                }

                {
                  // conditional check for events you own
                  eventsOwned.length > 0 && (
                    <>
                      <div className='d-flex flex-dir-row align-items-baseline'>
                        <h5>Your Plans</h5>
                      </div>
                      <div>{eventsOwnedItems}</div>
                    </>
                  )
                }

                {
                  // conditional checks for events you've attending
                  eventsParticipating.length > 0 && (
                    <>
                      <div className='d-flex flex-dir-row align-items-baseline'>
                        <h5>Calendar</h5>
                      </div>
                      <div>{eventsParticipatingItems}</div>
                    </>
                  )
                }

                {
                  // conditional checks for events you've invited to
                  eventsInvited.length > 0 && (
                    <>
                      <div className='d-flex flex-dir-row align-items-baseline'>
                        <h5>Invited</h5>
                      </div>
                      <div>{eventsInvitedItems}</div>
                    </>
                  )
                }
              </Tab>
            </Tabs>
          </div>

          {/* Buttons for logout, other events */}
          <div className='userPage-buttons-container'>
            <Button
              variant='primary'
              onClick={async () => {
                await setIsNewEvent(true);
                await setIsUserAttending(true);
                setTimeout(() => setShowCreateModal(true), 200);
              }}
            >
              Make Plans
            </Button>

            {/* Link below is styled like a bootstrap button */}
            <Link className='btn btn-primary' role='button' to='/eventpage'>
              Live Music
            </Link>
            <Link className='btn btn-primary' role='button' to='/parades'>
              Parades
            </Link>

            <Button
              variant='danger'
              className='btn-danger'
              onClick={async () => {
                await setConfirmActionBundle.setConfirmActionFunction(
                  () => () =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                );
                await setConfirmActionBundle.setConfirmActionText(`log your butt out.`);
                await setConfirmActionBundle.setShowConfirmActionModal(true);
              }}
              disabled={isDemoMode}
            >
              Log Out
            </Button>

            {/* <DropdownButton
              title='Select Theme'
              drop='up'
              id='theme-dropup'
              variant='secondary'
            >
              <Dropdown.Item onClick={() => setTheme('pg-theme-light')}>
                Regular Mode
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setTheme('pg-theme-vis')}>
                Colorblind Mode
              </Dropdown.Item>
              <Dropdown.Item onClick={handleDeepGrasMode}>
                Deep Gras Mode
              </Dropdown.Item>
            </DropdownButton> */}
          </div>
        </div>
      </Row>
    </Container>
  );
};

interface UserPageProps {
  lng: number;
  lat: number;
  userId: number;
  setTheme: any;
  setConfirmActionBundle: any;
}

export default UserPage;
