/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Channel = {
  __typename: "Channel",
  name: string,
  midi: Midi,
};

export type Midi = {
  __typename: "Midi",
  note: number,
  value: string,
};

export type Publish2channelMutationVariables = {
  name: string,
  note: number,
  value: number,
};

export type Publish2channelMutation = {
  publish2channel?:  {
    __typename: "Channel",
    name: string,
    midi:  {
      __typename: "Midi",
      note: number,
      value: string,
    },
  } | null,
};

export type GetChannelQueryVariables = {
};

export type GetChannelQuery = {
  getChannel?:  {
    __typename: "Channel",
    name: string,
    midi:  {
      __typename: "Midi",
      note: number,
      value: string,
    },
  } | null,
};

export type Subscribe2channelSubscriptionVariables = {
};

export type Subscribe2channelSubscription = {
  subscribe2channel?:  {
    __typename: "Channel",
    name: string,
    midi:  {
      __typename: "Midi",
      note: number,
      value: string,
    },
  } | null,
};
