import { FormEvent, useEffect } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  SetCurrentUserAction,
  setCurrentUser,
} from "../redux/store";
import { authService } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const dispatch: Dispatch<SetCurrentUserAction> = useDispatch();

  const currentUser: string | null = useSelector(
    (state: RootState) => state.auth.currentUser,
  );

  // 회원가입
  const signUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email: string = formData.get("email") as string;
    const password: string = formData.get("password") as string;

    await createUserWithEmailAndPassword(authService, email, password);
  };
  // 회원가입

  // 로그인
  const logIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email: string = formData.get("email") as string;
    const password: string = formData.get("password") as string;

    await signInWithEmailAndPassword(authService, email, password);
  };
  // 로그인

  // 로그아웃
  const logOut = () => {
    authService.signOut();
    dispatch(setCurrentUser(null));
    sessionStorage.removeItem("uid");
  };
  // 로그아웃

  // useEffect를 사용하여 로그인 상태 변화 감지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authService, (user) => {
      if (user) {
        dispatch(setCurrentUser(user.uid));
        sessionStorage.setItem("uid", user.uid);
      } else {
        dispatch(setCurrentUser(null));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);
  // useEffect를 사용하여 로그인 상태 변화 감지

  return (
    <>
      <div>
        <h1>회원가입</h1>
        <form onSubmit={signUp}>
          <input type="text" name="email" placeholder="이메일" />
          <input type="password" name="password" placeholder="비밀번호" />
          <button type="submit">회원가입</button>
        </form>
      </div>
      <div>
        <h1>로그인</h1>
        <form onSubmit={logIn}>
          <input type="text" name="email" placeholder="이메일" />
          <input type="password" name="password" placeholder="비밀번호" />
          <button type="submit">로그인</button>
        </form>
        {currentUser && <button onClick={logOut}>로그아웃</button>}{" "}
      </div>
    </>
  );
};

export default Login;
