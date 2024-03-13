import { createStore, Action } from "redux";

// 초기 상태 정의 인터페이스
interface InitialState {
  currentUser: null | string;
}
// 초기 상태 정의 인터페이스

// 초기 상태 설정
const initialState: InitialState = {
  currentUser: null,
};
// 초기 상태 설정

// 액션 타입 정의
enum ActionTypes {
  SET_CURRENT_USER = "SET_CURRENT_USER", // 현재 사용자를 설정하는 액션
}
// 액션 타입 정의

// 액션 생성
export interface SetCurrentUserAction extends Action {
  type: ActionTypes.SET_CURRENT_USER; // 액션의 타입은 SET_CURRENT_USER
  payload: string | null; // 액션의 페이로드는 문자열 또는 null
}
// 액션 생성

// setCurrentUser 액션 생성자 정의
export const setCurrentUser = (user: string | null): SetCurrentUserAction => ({
  type: ActionTypes.SET_CURRENT_USER, // 액션 타입 설정
  payload: user, // 사용자 정보를 페이로드로 설정
});
// setCurrentUser 액션 생성자 정의

// 리듀서 함수 정의
const reducer = (
  state: InitialState = initialState, // 초기 상태 설정
  action: SetCurrentUserAction, // SetCurrentUserAction 타입의 액션
): InitialState => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_USER: // SET_CURRENT_USER 액션 처리
      return {
        ...state, // 이전 상태 유지
        currentUser: action.payload, // 현재 사용자 정보 갱신
      };
    default:
      return state; // 기본적으로 이전 상태 반환
  }
};
// 리듀서 함수 정의

// 리듀서와 초기 상태로 스토어 생성
const store = createStore(reducer); // 리듀서와 초기 상태로 스토어 생성
// 리듀서와 초기 상태로 스토어 생성

export default store;
