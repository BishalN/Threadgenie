export function Form() {
  return (
    <form className="my-10 space-y-8 divide-y divide-gray-200 rounded-md bg-gray-100 p-4 shadow-md">
      <div className="space-y-8 divide-y divide-gray-200">
        <div className="pt-8">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Generate a Thread
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              All generated tweets are stored in a database for future reference
              and are public.
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
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Generate Thread
          </button>
        </div>
      </div>
    </form>
  );
}
