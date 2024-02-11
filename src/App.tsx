import "./App.css";
import React, { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { subscribe2channel } from "./graphql/subscriptions"; //codegen generated code
import * as mutations from "./graphql/mutations"; //codegen generated code
import { Subscription } from "rxjs/internal/Subscription";

let channel = "midi1";

Amplify.configure({
  API: {
    GraphQL: {
      endpoint:
        "https://afno5ipvkfamfagfok7ad4qnwm.appsync-api.us-west-1.amazonaws.com/graphql",
      region: "us-west-1",
      defaultAuthMode: "apiKey",
      apiKey: "da2-4wxpueumwrczlbhten3rrje4bi",
    },
  },
});

const client = generateClient();

function App() {
  const [sub, setSub] = useState();
  useEffect(() => {
    const subscription = client
      .graphql({
        query: subscribe2channel,
      })
      .subscribe({
        next: (data) => {
          console.log(data, "< data");
          console.log("im happening");
        },
        error: (error) => console.warn(error),
      });
    return () => subscription.unsubscribe();
  }, [channel]);

  return <div>hello</div>;
}

export default App;
