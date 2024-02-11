/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const publish2channel = /* GraphQL */ `mutation Publish2channel($name: String!, $note: Int!, $value: Float!) {
  publish2channel(name: $name, note: $note, value: $value) {
    name
    midi {
      note
      value
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.Publish2channelMutationVariables,
  APITypes.Publish2channelMutation
>;
