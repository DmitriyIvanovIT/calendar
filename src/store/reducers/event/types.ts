import { IUser } from "types/global";
import { IEvent } from "types/IEvent";

export interface EventState {
  guests: IUser[];
  events: IEvent[];
};

export enum EventActionEnum {
  SET_GUESTS = "SET_GUESTS",
  SET_EVENTS = "SET_EVENTS"
};

export interface SetGuestAction {
  type: EventActionEnum.SET_GUESTS;
  payload: IUser[];
};

export interface SetEventAction {
  type: EventActionEnum.SET_EVENTS;
  payload: IEvent[];
};

export type EventAction = SetGuestAction | SetEventAction;