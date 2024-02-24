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
      apiKey: "da2-7fj75oc5ufginkjobizl45jy6m",
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

  function sketch(p5: P5CanvasInstance) {
    p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

    p5.draw = () => {
      p5.background(250);
      p5.normalMaterial();
      p5.push();
      p5.rotateZ(p5.frameCount * 0.01);
      p5.rotateX(0.05);
      p5.rotateY(p5.frameCount * 0.01);
      p5.plane(100);
      p5.pop();
    };
  }

  return (
    <div>
      <h5>channel: {data.name}</h5>
      <div>note: {data.midi.note}</div>
      <div>value: {data.midi.value}</div>
      <ReactP5Wrapper sketch={sketch} data={data} />
      <Mouth rows={20} columns={20} circleSize={10}></Mouth>
    </div>
  );
}

export default App;
