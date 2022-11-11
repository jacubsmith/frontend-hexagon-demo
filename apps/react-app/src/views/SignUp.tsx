import { IAccountAPI } from "@hexademo/domain";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HonkLayout from "../components/HonkLayout";

type SignUpViewProps = {
  accountAPI: IAccountAPI;
};

/**
 *
 * @param props
 */
function SignUpView(props: SignUpViewProps) {
  const navigate = useNavigate();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  /**
   *
   * @param event
   */
  function handleSignEvent(event: Event) {
    const customEvent = event as CustomEvent;
    setUsername(customEvent.detail.username);
    setPassword(customEvent.detail.password);
    return props.accountAPI
      .register(customEvent.detail.username, customEvent.detail.password)
      .then(() => {
        navigate("/");
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
          form-title="Register"
          btn-label="Register"
          img="https://source.unsplash.com/uymG7UVPXpI/1000x1200"
          username={username}
          password={password}
        >
          <p className="sign-option">
            Already have login and password?
            <Link to="/">Sign in</Link>
          </p>
        </tweet-sign>
      }
    />
  );
}

export default SignUpView;
