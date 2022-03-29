import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import "./App.css";
import initializeAuthentication from "./Firebase/firebase.initialize";

initializeAuthentication();

const provider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState({});
  const { name, email, image } = user;

  const handleGoogleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          image: photoURL,
        };
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="App">
      <button
        onClick={handleGoogleSignIn}
        style={{
          backgroundColor: "#2c2c54",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "12px 36px",
          marginTop: "50px",
          fontSize: "17px",
          cursor: "pointer",
        }}
      >
        Sign In With Google
      </button>
      <br />
      <br />
      <br />
      <br />
      {email && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <img src={image} alt="" />
          </div>
          <div style={{ textAlign: "left", marginLeft: "15px" }}>
            <h3>
              <span style={{ fontSize: "26px", color: "#227093" }}>Name:</span>{" "}
              {name}
            </h3>
            <p>{email}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
