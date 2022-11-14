import type { ActionFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";

export const action: ActionFunction = async ({ 
  request,
 }) => {
  const formData = await request.formData();
  // create url from env variable
  const url = new URL(process.env.STEPZEN_ENDPOINT || "");
  const query = formData.get("query")?.toString();
  // apikey comes from env
  const APIKEY = process.env.STEPZEN_API_KEY;
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `apikey ${APIKEY}`,
    },
    body: JSON.stringify({
      query: query,
      variables: {},
    }),
  });
  const data = await result.json();
  return {data: data, query: query};
};


const Main = () => {

};

export default function Index() {
  const actionData = useActionData();
  return (
    <main className="container mx-auto px-8 py-4">
      <h1 className="text-4xl font-bold">GraphQL Query</h1>
      <form method="post" action="/?index">
        <div className="py-10">
          <div>
            <div>
              <label
                htmlFor="query"
                className="block text-sm font-medium text-gray-700"
              >
                Query
              </label>
              <textarea
                id="query"
                name="query"
                rows="8"
                className="block w-full rounded-md border-gray-500 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="query MyQuery { }"
                defaultValue={actionData?.query}
              ></textarea>
            </div>
          </div>
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Run Query
          </button>
        </div>
      </form>
      <div className="py-10 border-gray-500 rounded">
        <pre>{JSON.stringify(actionData?.data, null, 2)}</pre>
      </div>
    </main>
  );
}
