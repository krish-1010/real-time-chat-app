import { useRef, useState } from "react";
import "./App.css";
import { Auth } from "./components/Auth";
import Cookies from "universal-cookie";
import Chat from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomNumber = useRef(null);

  const signuserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  } else {
    return (
      <div>
        {room ? (
          <div>
            <Chat room={room} />
          </div>
        ) : (
          <div className="room">
            <label>Enter Room Name:</label>
            <input ref={roomNumber} type="text" name="text" id="text" />
            <button onClick={() => setRoom(roomNumber.current.value)}>
              Enter Chat
            </button>
          </div>
        )}
        <div className="sign-out">
          <button type="button" onClick={() => signuserOut()}>
            Sign Out
          </button>
        </div>
      </div>
    );
  }
}

export default App;
