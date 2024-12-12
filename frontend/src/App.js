import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// import Home from "./pages/home/Home";
// import Home from "./pages/Home";
import EventDet from "./pages/admin/events/EventDet";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/navbar/NavBar";

// import Home from "./pages/home/Home";
// import Home from "./pages/Home";
import wordsToNumbers from "words-to-numbers";
import Login from "./pages/login/Login";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";
import Admin from "./pages/admin/Admin";
import axios from "axios";
import { baseURL } from "./api/api";
import Register from "./pages/register/Register";
import NotFound from "./pages/notfound/NotFound";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Users from "./pages/admin/users/Users";
import Events from "./pages/admin/events/Events";
import Clubs from "./pages/admin/clubs/Clubs";
import Analytics from "./pages/admin/analytics/Analytics";
import Ban from "./pages/admin/Ban/ban";
import Userbanned from "./pages/admin/Ban/UserBanned";
import Apiban from "./pages/admin/Ban/apiban";
import User from "./pages/admin/users/user";
import ForgetP from "./pages/forgotpassword/ForgetP";
import ResetP from "./pages/forgotpassword/ResetPassword";
import Mini from "./pages/local/Mini";
import { FaceDetection } from "face-api.js";
import ChatLive from "./components/chat/LiveChat";
import io from "socket.io-client";
import Profile from "./pages/profile/Profile";
import EmailVerify from "./pages/EmailVerify";
import Chatgbt from "./pages/ChatGbt/Chatgbt";
import NavBarForum from "./pages/forum/components/NavBarForum";
import Forum from "./pages/forum/Forum";
import PostPopUp from "./pages/forum/components/PostPopUp";
import PostModal from "./pages/forum/components/PostModal";
import Chat from "./pages/Chat/Chat";
import VideoCall from "./components/testvideocall/testvideocall";
import Homee from "./pages/home/Homee";
import Question from "./pages/Quiz/Question";
import Start from "./pages/Quiz/Start";
import ListItem from "./pages/Quiz/ListItem";
import Result from "./pages/Quiz/Result";
import MapEvent from "./pages/MapEvent/mapevent";
import Quizzes from "./pages/admin/quiz/quizzes";
import Quiz from "./pages/admin/quiz/quiz";
import AddQuiz from "./pages/admin/quiz/addquiz";
import MapAdmin from "./pages/admin/MapAdmin/mapevent";
import ParticipateScreen from "./pages/ParticipateScreen/ParticipateScreen";
import Event from "./pages/Event/Event";
import Calendar from "./pages/calendar/Calendar";
import EventDetails from "./pages/EventDetails/EventDetails";
import ClubList from "./pages/ClubList/ClubList";
import ClubProfile from "./pages/clubProfile/ClubProfile";
import useStyles from "./styles";
import Live from "./components/Live/Live";
import Donation from "./components/Donation/Donation";
import alanBtn from "@alan-ai/alan-sdk-web";
import { NewsCards } from "./components/NewsCards/NewsCards";
import CanvasModel from "./MetaVerse/ProfileMeta/CanvasModel";
import CanvasIntro from "./MetaVerse/Introduction/CanvasIntro";
import IntroExp from "./MetaVerse/Introduction/components/IntroExp";
function App() {
  const { auth, setAuth, logged, setLogged, socket, setSocket } =
    useContext(AuthContext);
  //const socket = io("http://localhost:5000"); // connect to the server
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();

  const alanKey =
    "719a4db1bd22c5579a847170b8b532b62e956eca572e1d8b807a3e2338fdd0dc/stage";
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setSocket(io("ws://localhost:8800"));
    if (!token) {
      return;
    } else {
      axios
        .get(`${baseURL}/users/userconnected`, {
          headers: { authorization: token },
        })
        .then((res) => {
          console.log(res);
          setAuth(res.data.user);
          setLogged(true);

          alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
              if (command === "newz") {
                navigate("/news");
              }
              if (command === "home") {
                navigate("/home");
              }
              if (command === "chat") {
                console.log("chat");
                navigate("/chat");
              }
              if (command === "donation") {
                navigate("/donate");
              }
              if (command === "myprofile") {
                navigate(`/profile/${auth._id}`);
              }
              if (command === "newHeadlines") {
                setNewsArticles(articles);
                setActiveArticle(-1);
              } else if (command === "instructions") {
                setIsOpen(true);
              } else if (command === "highlight") {
                setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
              } else if (command === "open") {
                const parsedNumber =
                  number.length > 2
                    ? wordsToNumbers(number, { fuzzy: true })
                    : number;
                const article = articles[parsedNumber - 1];

                if (parsedNumber > articles.length) {
                  alanBtn().playText("Please try that again...");
                } else if (article) {
                  console.log(article);
                  window.open(article.url, "_blank");
                  alanBtn().playText("Opening...");
                } else {
                  alanBtn().playText("Please try that again...");
                }
              }
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <NavBar />

      <Routes>
        {logged ? (
          <>
            {auth.role === "admin" ? (
              <Route path="/admin" element={<Admin />}>
                <Route element={<Dashboard />} path="dashboard" />
                <Route element={<Users />} path="users" />
                <Route element={<Events />} path="events" />
                <Route element={<Clubs />} path="clubs" />
                <Route element={<Analytics />} path="analytics" />
                <Route path="donate" element={<Donation />} />

                <Route element={<Ban />} path="Ban" />
                <Route element={<Apiban />} path="banner" />
                <Route element={<User />} path="users/user/:username" />
                <Route element={<Quizzes />} path="quiz" />
                <Route element={<Quiz />} path="quiz/quiz/:id" />
                <Route element={<AddQuiz />} path="quiz/quiz/addquiz" />
                <Route element={<MapAdmin />} path="map" />
                <Route element={<EventDet />} path="events/event/:id" />
              </Route>
            ) : (
              <>
                {/* // <Route path="/home" element={<Home />} /> */}
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/home" element={<Homee />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/videcall" element={<VideoCall />} />
                <Route path="/chatgbt" element={<Chatgbt />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/canvas" element={<CanvasModel />} />
                <Route path="/intro" element={<CanvasIntro />} />
                <Route path="/forum/:id" element={<PostPopUp />} />
                <Route exact path="/start" element={<Start />} />
                <Route exact path="/quiz" element={<Question />} />
                <Route exact path="/item/:id" element={<ListItem />} />
                <Route exact path="/result" element={<Result />} />
                <Route exact path="/mapevent" element={<MapEvent />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/videcall" element={<VideoCall />} />
                <Route path="/eventss" element={<EventDetails />} />
                <Route path="/event/:id" element={<Profile />} />
                <Route path="/Live" element={<Live />} />

                <Route
                  path="/participate/:id"
                  element={<ParticipateScreen />}
                />
                <Route path="/clubs" element={<ClubList />}></Route>
                <Route path="/clubs/:id" element={<ClubProfile />} />

                <Route path="/donate" element={<Donation />} />
                <Route
                  path="/news"
                  element={
                    <NewsCards
                      newsArticles={newsArticles}
                      activeArticle={activeArticle}
                    />
                  }
                />

                {/* <Route
                  path="/message"
                  element={<Chat socket={socket} user={auth} />}
                /> */}
              </>

              // <Route path="/home" element={<FaceDetection />} />
            )}
          </>
        ) : (
          <>
            <Route path="/" element={<CanvasIntro />} />
            <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/ForgetP" element={<ForgetP />} />
            <Route path="/resetP" element={<ResetP />} />
            <Route path="/Mini" element={<Mini />} />
          </>
        )}
        <Route path="/donate" element={<Donation />} />
        <Route path="/userbanned" element={<Userbanned />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
