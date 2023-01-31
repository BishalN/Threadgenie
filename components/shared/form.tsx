import { useMemo, useState } from "react";
import { CopyButton } from "../copy-button";

export function Form() {
  const [title, setTitle] = useState("");
  const [style, setStyle] = useState("");
  const [tweetNumber, setTweetNumber] = useState<undefined | number>();
  const [twitterThread, setTwitterThread] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const generateThread = async (e: any) => {
    e.preventDefault();
    setTwitterThread("");
    setLoading(true);
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
    setTweetNumber(undefined);
  };

  console.log(twitterThread);

  const parsedThread = useMemo(() => {
    // split the string from new line characters and filter out empty strings
    return twitterThread.split("\n").filter((tweet) => tweet !== "");
  }, [twitterThread]);

  return (
    <div className="my-10 max-w-2xl cursor-pointer space-y-8 divide-y divide-gray-200 rounded-lg  border-gray-200 bg-white py-4 px-8 shadow-md">
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
                  <input
                    id="style"
                    name="style"
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    placeholder="Humour, Serious, Casual"
                    type="text"
                    autoComplete="style"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                  />
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
              {loading ? "Loading..." : "Generate Thread"}
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
              className="my-4 flex rounded-lg border-2 border-gray-400 bg-gray-300 p-4 text-sm shadow-lg"
            >
              <p className="text-gray-700">{tweet}</p>
              <CopyButton value={tweet} />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
