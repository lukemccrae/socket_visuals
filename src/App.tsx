import "./App.css";
import React, { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { subscribe2channel } from "./graphql/subscriptions"; //codegen generated code
import * as mutations from "./graphql/mutations"; //codegen generated code
import { Subscription } from "rxjs/internal/Subscription";
import { Channel } from "./API";
import { ReactP5Wrapper, P5CanvasInstance } from "@p5-wrapper/react";
import Mouth from "./Mouth";

Amplify.configure({
  API: {
    GraphQL: {
      endpoint:
        "https://afno5ipvkfamfagfok7ad4qnwm.appsync-api.us-west-1.amazonaws.com/graphql",
      region: "us-west-1",
      defaultAuthMode: "apiKey",
      apiKey: process.env.REACT_APP_WS_X_API_KEY,
    },
  },
});

type Midi = {
  note: number;
  value: number;
};

type MidiMessage = {
  __typename: string;
  name: string;
  midi: Midi;
};

const client = generateClient();

function App() {
  let data: MidiMessage = {
    __typename: "initial",
    name: "midi 1",
    midi: {
      note: 1,
      value: 1.5,
    },
  };
  const [send, setSend] = useState("");
  const [received, setReceived] = useState<MidiMessage>(data);

  let channel = "midi1";

  useEffect(() => {
    const subscription = client
      .graphql({
        query: subscribe2channel,
      })
      .subscribe({
        next: ({ data }) => {
          setReceived(data.subscribe2channel);
        },
        error: (error) => console.warn(error),
      });
    return () => subscription.unsubscribe();
  }, [channel]);

  if (received && received.midi) {
    data = received;
  }

  const colors = ["blue", "green", "yellow", "purple"];
  console.log(
    process.env.WS_X_API_KEY,
    "<< process.env.REACT_APP_WS_X_API_KEY"
  );

  return (
    <div>
      <h5>channel: {data.name}</h5>
      <div>note: {data.midi.note}</div>
      <div>value: {data.midi.value}</div>
      <div
        style={{
          height: "100%",
          margin: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "300px",
            height: "300px",
            backgroundColor: colors[data.midi.value],
            textAlign: "center",
            lineHeight: "200px",
          }}
        ></div>
      </div>
    </div>
  );
}

export default App;
