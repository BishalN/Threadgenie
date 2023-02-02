import { useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { CopyButton } from "../copy-button";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import LoadingDots from "./icons/loading-dots";

export function Form() {
  const [title, setTitle] = useState("");
  const [style, setStyle] = useState("");
  const [tweetNumber, setTweetNumber] = useState<undefined | number>();
  const [twitterThread, setTwitterThread] = useState("");
  const [loading, setLoading] = useState(false);

  const generateThread = async (e: any) => {
    e.preventDefault();
    setTwitterThread("");
    // check if all fields are filled
    if (!title || !tweetNumber) {
      toast.error("Please fill all the fields");
      return;
    }
    // check if the title is less than 3 characters long
    if (title.length < 3) {
      toast.error("Title must be at least 3 characters long");
      return;
    }
    // check if the tweet number is less than 2 or greater than 10
    if (tweetNumber < 2 || tweetNumber > 10) {
      toast.error("Tweet number must be between 2 and 10");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/threadgen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          style,
          tweetNumber,
        }),
      });
      const data = await response.json();
      setTwitterThread(data);
      setLoading(false);
      // reset all the fields
      setTitle("");
      setStyle("");
      setTweetNumber(0);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  const parsedThread = useMemo(() => {
    // split the thread into an array of tweets and filter out empty tweets
    return twitterThread.split("\n").filter((tweet) => tweet !== "" && tweet);
  }, [twitterThread]);

  return (
    <motion.div
      variants={FADE_DOWN_ANIMATION_VARIANTS}
      className="my-10 max-w-2xl cursor-pointer space-y-8 divide-y divide-gray-200 rounded-lg  border-gray-200 bg-white py-4 px-8 shadow-md"
    >
      <form>
        <div className="space-y-8 divide-y divide-gray-200">
          <div className="pt-8">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Generate a Thread
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                All generated tweets are stored in a database for future
                reference and are public.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <div className="mt-1">
                  <textarea
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Web development for nubies"
                    autoComplete="title"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="style"
                  className="block text-sm font-medium text-gray-700"
                >
                  Style
                </label>
                <div className="mt-1">
                  <select
                    name="style"
                    id="style"
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                  >
                    <option value="funny">Funny</option>
                    <option value="casual">Casual</option>
                    <option value="explainer">Explainer</option>
                    <option value="serious">Serious</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Number of tweets
                </label>
                <div className="mt-1">
                  <input
                    id="number"
                    value={tweetNumber}
                    onChange={(e) => setTweetNumber(+e.target.value)}
                    placeholder="5"
                    name="number"
                    type="number"
                    autoComplete="number"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex ">
            <button
              type="button"
              onClick={generateThread}
              disabled={loading}
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              {loading ? (
                <span className="px-4">
                  <LoadingDots color="white" />
                </span>
              ) : (
                "Generate Thread"
              )}
            </button>
          </div>
        </div>
      </form>
      {twitterThread ? (
        <div className="">
          <h3 className="my-6 text-lg font-medium leading-6 text-gray-900">
            Generated Thread
          </h3>
          {parsedThread.map((tweet, index) => (
            <div
              key={index}
              className="my-4 flex justify-between rounded-lg bg-gray-600 p-4 text-sm shadow-md"
            >
              <p className="text-gray-200">{tweet}</p>
              <CopyButton value={tweet.split(":")[1]} />
            </div>
          ))}
          {/* <a
            target="_blank"
            href={`https://twitter.com/intent/tweet?text=${parsedThread[0]}`}
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            rel="noreferrer"
          >
            Tweet It Now
          </a> */}
        </div>
      ) : null}
    </motion.div>
  );
}
