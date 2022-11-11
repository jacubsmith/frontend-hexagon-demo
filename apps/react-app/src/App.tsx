import { Routes, Route, HashRouter, Navigate } from "react-router-dom";
import { AppLoader } from "@hexademo/loader";
import HomeView from "./views/Home";
import SignInView from "./views/SignIn";
import SignUpView from "./views/SignUp";
/**
 *
 */
function App() {
  const twitterInstance = AppLoader.getTwitterInstance();
  const accountInstance = AppLoader.getAccountInstance();
  return (
    // <div className="App">
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace={true} />} />

        <Route
          path="/signin"
          element={<SignInView accountAPI={accountInstance} />}
        />
        <Route
          path="home"
          element={
            <HomeView
              accountAPI={accountInstance}
              twitterAPI={twitterInstance}
            />
          }
        />
        <Route
          path="signup"
          element={<SignUpView accountAPI={accountInstance} />}
        />
      </Routes>
    </HashRouter>
    // </div>
  );
}

export default App;
