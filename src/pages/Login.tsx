import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FormEvent, useState } from "react";
import { authService } from "../firebase";

const Login = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  //회원가입
  const signUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email: string = formData.get("email") as string;
    const password: string = formData.get("password") as string;

    await createUserWithEmailAndPassword(authService, email, password);
  };
  //회원가입

  //로그인
  const logIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email: string = formData.get("email") as string;
    const password: string = formData.get("password") as string;

    await signInWithEmailAndPassword(authService, email, password);
  };
  //로그인

  //로그아웃
  const logOut = () => {
    authService.signOut();
  };
  //로그아웃

  //사용자 아이디 조회
  onAuthStateChanged(authService, (user) => {
    if (user) {
      setCurrentUser(user.uid);
    } else {
      setCurrentUser(null);
    }
    console.log(currentUser);
  });
  //사용자 아이디 조회

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
        {currentUser && <button onClick={logOut}>로그아웃</button>}
      </div>
    </>
  );
};

export default Login;
