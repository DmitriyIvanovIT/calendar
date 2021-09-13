import {EventActionEnum, SetEventAction, SetGuestAction} from "./types";
import {IUser} from "types/global";
import {IEvent} from "types/IEvent";
import {AppDispatch} from "store";
import UserService from "api/UserService";

export const EventActionCreators = {
  setGuests: (payload: IUser[]): SetGuestAction => ({type: EventActionEnum.SET_GUESTS, payload}),
  setEvents: (payload: IEvent[]): SetEventAction => ({type: EventActionEnum.SET_EVENTS, payload}),
  fetchGuests: () => async (dispatch: AppDispatch) => {
    try {
      const response = await UserService.getUsers();
      dispatch(EventActionCreators.setGuests(response.data))
    } catch (e) {
      console.error(e);
    }
  },
  createEvent: (event: IEvent) => async (disatch: AppDispatch) => {
    try {
      const events = localStorage.getItem("events") || '[]';
      const json = JSON.parse(events) as IEvent[];
      json.push(event);
      disatch(EventActionCreators.setEvents(json));
      localStorage.setItem('events', JSON.stringify(json));
    } catch (e) {
      console.error(e);
    }
  },
  fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem("events") || '[]';
      const json = JSON.parse(events) as IEvent[];
      const currentUserEvents = json.filter(ev => ev.author === username || ev.guest === username);
      dispatch(EventActionCreators.setEvents(currentUserEvents));
    } catch (e) {
      console.error(e);
    }
  }
};