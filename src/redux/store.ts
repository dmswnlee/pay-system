import { createStore, Action, combineReducers } from "redux";
import { EventData } from "../pages/WorkManagement";

// 초기 상태 정의
interface AuthState {
  currentUser: null | string;
}

interface EventState {
  events: EventData[];
}

// 초기 상태 설정
const initialAuthState: AuthState = {
  currentUser: null,
};

const initialEventState: EventState = {
  events: [],
};

// 액션 타입 정의
enum AuthActionTypes {
  SET_CURRENT_USER = "SET_CURRENT_USER",
}
enum EventActionTypes {
  ADD_EVENT = "ADD_EVENT",
  DELETE_EVENT = "DELETE_EVENT",
  EDIT_EVENT = "EDIT_EVENT",
}

// login 액션 생성
export interface SetCurrentUserAction extends Action {
  type: AuthActionTypes.SET_CURRENT_USER;
  payload: string | null;
}

export const setCurrentUser = (user: string | null): SetCurrentUserAction => ({
  type: AuthActionTypes.SET_CURRENT_USER,
  payload: user,
});

// workManagement 액션 생성
export interface AddEventAction {
  type: EventActionTypes.ADD_EVENT;
  payload: EventData;
}

export const addEvent = (event: EventData): AddEventAction => ({
  type: EventActionTypes.ADD_EVENT,
  payload: event,
});

export interface DeleteEventAction {
  type: EventActionTypes.DELETE_EVENT;
  payload: string;
}

export const deleteEvent = (eventId: string): DeleteEventAction => ({
  type: EventActionTypes.DELETE_EVENT,
  payload: eventId,
});

export interface EditEventAction {
  type: EventActionTypes.EDIT_EVENT;
  payload: EventData;
}

export const editEvent = (event: EventData): EditEventAction => ({
  type: EventActionTypes.EDIT_EVENT,
  payload: event,
});

// login 리듀서 함수 정의
const authReducer = (
  state: AuthState = initialAuthState,
  action: SetCurrentUserAction,
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

// workManagement 리듀서 함수 정의
const eventReducer = (
  state: EventState = initialEventState,
  action: AddEventAction | DeleteEventAction | EditEventAction,
): EventState => {
  switch (action.type) {
    case EventActionTypes.ADD_EVENT:
      return {
        ...state,
        events: [action.payload, ...state.events],
      };
    case EventActionTypes.DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload),
      };
    case EventActionTypes.EDIT_EVENT:
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id
            ? { ...event, title: action.payload.title }
            : event,
        ),
      };
    default:
      return state;
  }
};

export interface RootState {
  auth: AuthState;
  events: EventState;
}

// 루트 리듀서 생성
const rootReducer = combineReducers({
  auth: authReducer,
  events: eventReducer,
});

const store = createStore(rootReducer);

export default store;
