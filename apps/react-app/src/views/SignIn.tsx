import "@hexademo/web-components/dist/components/tweet-sign";
import { IAccountAPI } from "@hexademo/domain";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HonkLayout from "../components/HonkLayout";

type SignInViewProps = {
  accountAPI: IAccountAPI;
};

/**
 *
 * @param props
 */
function SignInView(props: SignInViewProps) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /**
   *
   * @param event
   */
  function handleSignEvent(event: Event) {
    const customEvent = event as CustomEvent;
    setUsername(customEvent.detail.username);
    setPassword(customEvent.detail.password);
    return props.accountAPI
      .authenticate(customEvent.detail.username, customEvent.detail.password)
      .then(() => {
        navigate("/home");
      });
  }

  useEffect(() => {
    window.addEventListener("signSubmited", handleSignEvent);
    return () => {
      window.removeEventListener("signSubmited", handleSignEvent);
    };
  });

  return (
    <HonkLayout
      main={
        <tweet-sign
          form-title="Sign in"
          btn-label="Login"
          img="https://source.unsplash.com/uymG7UVPXpI/1000x1200"
          username={username}
          password={password}
        >
          <p className="sign-option">
            Don't have an account yet? <Link to="/signup">Register now</Link>
          </p>
        </tweet-sign>
      }
    />
  );
}

export default SignInView;
