import { IAccountAPI, ITwitterAPI, Tweet } from "@hexademo/domain";
import { useEffect, useState } from "react";
import "@hexademo/web-components/dist/components/tweet-card";
import { useNavigate } from "react-router-dom";
import CreateTweetComponent from "../components/CreateTweet";
import HonkLayout from "../components/HonkLayout";

type HomeViewProps = {
  twitterAPI: ITwitterAPI;
  accountAPI: IAccountAPI;
};

/**
 *
 * @param props
 */
function HomeView(props: HomeViewProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [tweets, setTweets] = useState([] as Array<Tweet>);

  /**
   * Get tweets
   *
   * @returns {Promise<void>}
   */
  async function listTweets() {
    const resp = await props.twitterAPI.listTweets();
    await setTweets(resp);
  }

  /**
   * Logout user
   *
   * @param e
   * @param event
   * @returns {Promise<void>}
   */
  function logout(event: Event) {
    event.preventDefault();
    return props.accountAPI.logout().then(() => {
      navigate("/");
    });
  }

  /**
   * Refresh tweet list
   *
   * @returns {void}
   */
  function refresh() {
    listTweets();
  }

  /**
   * Handle like event
   *
   * @param event
   * @returns {Promise<void>}
   */
  async function handleTweetLikedEvent(event: Event) {
    const customEvent = event as CustomEvent;
    const items = [...tweets];
    const tweetId = customEvent.detail;
    const index = items.findIndex((tweet) => tweet.id === tweetId);
    if (index === -1) return;

    const tweet = await props.twitterAPI.like(tweetId);
    items[index].likes = tweet.likes;
    setTweets(items);
  }

  useEffect(() => {
    try {
      setUsername(props.accountAPI.getUsername());
      listTweets();
    } catch (error) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    document.addEventListener("tweetLiked", handleTweetLikedEvent);
    document.addEventListener("tweetCreated", refresh);
    return () => {
      document.removeEventListener("tweetLiked", handleTweetLikedEvent);
      document.removeEventListener("tweetCreated", refresh);
    };
  }, [tweets]);

  // const tweets = await props.tweetService.listTweets();
  return (
    <HonkLayout
      header={
        <div>
          <ul>
            <li>{username}</li>
            <li>
              <button className="outline" onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      }
      main={
        <article>
          <header>
            <CreateTweetComponent
              twitterAPI={props.twitterAPI}
              handleCreated={refresh}
            ></CreateTweetComponent>
          </header>
          {tweets.map((tweet) => (
            <tweet-card
              key={tweet.id}
              tweet-id={tweet.id}
              author={tweet.author}
              message={tweet.message}
              created-at={tweet.createdAt}
              likes={tweet.likes}
            ></tweet-card>
          ))}
        </article>
      }
    />
  );
}

export default HomeView;
