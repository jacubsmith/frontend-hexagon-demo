import { ITwitterAPI } from "@hexademo/domain";
import "@hexademo/web-components/dist/components/tweet-create";
import { useEffect, useState } from "react";

type CreateTweetProps = {
  twitterAPI: ITwitterAPI;
};

/**
 *
 * @param props
 */
function CreateTweetComponent(props: CreateTweetProps) {
  const [message, setMessage] = useState("");
  /**
   *
   * @param event
   */
  async function handleSubmitEvent(event: Event) {
    const customEvent = event as CustomEvent;
    await props.twitterAPI.tweet(customEvent.detail);
    setMessage("");
  }

  useEffect(() => {
    window.addEventListener("tweetSubmited", handleSubmitEvent);
    return () => {
      window.removeEventListener("tweetSubmited", handleSubmitEvent);
    };
  }, [message]);

  return (
    <div>
      <tweet-create message={message}></tweet-create>
    </div>
  );
}

export default CreateTweetComponent;
