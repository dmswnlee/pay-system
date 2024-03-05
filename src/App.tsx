import { initializeApp } from "firebase/app";
import { child, get, getDatabase, ref } from "firebase/database";

const App = () => {
  const firebaseConfig = {
    databaseURL: import.meta.env.VITE_DATABASE_URL,
  };
  const app = initializeApp(firebaseConfig);

  const database = getDatabase(app);

  //파이어베이스 데이터 불러오는 코드
  const dbRef = ref(database);
  //사원번호 001인 직원의 정보를 불러오는 코드입니다.
  get(child(dbRef, `users/001`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return <></>;
};

export default App;
