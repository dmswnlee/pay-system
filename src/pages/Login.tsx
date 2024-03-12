import { FormEvent, useEffect, useRef, useState } from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { SetCurrentUserAction, setCurrentUser } from "../redux/store";
import { authService } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import {
  Box,
  Image,
  Input,
  Button,
  Spinner,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import mainlogo from "../assets/mainlogo.png";
import { useNavigate } from "react-router-dom";
import usePromiseLoading from "../hook/usePromiseLoading";

const Login = () => {
  const dispatch: Dispatch<SetCurrentUserAction> = useDispatch();
  const navigate = useNavigate();
  const { loading, setLoadingState } = usePromiseLoading();
  const [errorAlert, setErrorAlert] = useState(false); // State to control error alert
  const [errorAlertMessage, setErrorAlertMessage] = useState(""); // State to store error message
  const cancelRef = useRef(null);
  // 로그인
  const logIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoadingState(true);
    const formData = new FormData(e.currentTarget);
    const email: string = formData.get("email") as string;
    const password: string = formData.get("password") as string;

    try {
      await signInWithEmailAndPassword(authService, email, password);
      navigate("/MyInfo");
    } catch (error: any) {
      let errorMessage = "로그인에 실패하였습니다.";
      switch (error.code) {
        case "auth/invalid-credential":
          errorMessage = "계정정보가 일치하지 않습니다.";
          break;
        case "auth/missing-password":
          errorMessage = "비밀번호를 입력해 주세요.";
          break;
        case "auth/invalid-email":
          errorMessage = "이메일 형식이 올바르지 않습니다.";
          break;
        default:
          break;
      }
      setErrorAlertMessage(errorMessage);
      setErrorAlert(true);
    } finally {
      setLoadingState(false);
    }
  };
  // 로그인

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
    <Box p="160px">
      <Box w="480px" p="40px" boxShadow="lg" borderRadius="12px" margin="auto">
        <Image src={mainlogo} margin="0 auto" mb="40px" />
        <form onSubmit={logIn}>
          <Input
            type="text"
            name="email"
            placeholder="이메일"
            mb="16px"
            borderColor="gray.100"
          />
          <Input
            type="password"
            name="password"
            placeholder="비밀번호"
            mb="40px"
            backgroundColor="white"
            borderColor="gray.100"
          />
          <Button w="100%" colorScheme="teal" type="submit">
            {loading ? <Spinner size="sm" color="white" /> : "로그인"}
          </Button>
        </form>
      </Box>
      <AlertDialog
        isOpen={errorAlert}
        leastDestructiveRef={cancelRef} // 여기에 leastDestructiveRef 추가
        onClose={() => setErrorAlert(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>로그인 실패</AlertDialogHeader>
            <AlertDialogBody>{errorAlertMessage}</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setErrorAlert(false)}>
                확인
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Login;
