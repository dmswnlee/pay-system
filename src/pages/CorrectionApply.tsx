import { useState } from 'react';

import {
  addDoc,
  collection,
} from 'firebase/firestore';
import styled from 'styled-components';

import {
  Button,
  Select,
} from '@chakra-ui/react';

import Title from '../components/Title';
import {
  authService,
  firestoreService,
} from '../firebase';

const Wrapper = styled.div`
  padding-top: 58px;
  .chakra-select {
    border: solid 1px #e2e8f0;
  }
`;
const SubTitle = styled.h2`
  font-size: 24px;
  margin-top: 64px;
  margin-bottom: 8px;
`;
const DateRow = styled.div`
  display: flex;
  gap: 18px;
`;

const TextArea = styled.textarea`
  width: 100%;
  border: solid 1px #e2e8f0;
  border-radius: 12px;
  margin-bottom: 64px;
`;
const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  .chakra-button {
    width: 200px;
    justify-content: center;
    background-color: #38b2ac;
  }
`;
const CorrectionApply = () => {
  const startYear = 2014;
  const endYear = 2024;

  const year = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => startYear + index + "년",
  );
  const month = Array.from(
    { length: 12 - 1 + 1 },
    (_, index) => 1 + index + "월",
  );
  const day = Array.from(
    { length: 31 - 1 + 1 },
    (_, index) => 1 + index + "일",
  );

  const [form, setForm] = useState({
    year: "",
    month: "",
    day: "",
    context: "",
  });
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, year: event.target.value });
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, month: event.target.value });
  };
  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, day: event.target.value });
  };
  const handleContextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, context: event.target.value });
  };
  const user = authService.currentUser;
  const formatDate = (year: string, month: string, day: string) => {
    // 각 값이 한 자리 수인 경우 앞에 0을 붙여줍니다.
    const formattedYear = year.replace(/[^0-9]/g, ""); // "년" 제거
    const replacedMonth = month.replace(/[^0-9]/g, ""); // "월" 제거
    const formattedMonth =
      parseInt(replacedMonth) < 10 ? `0${replacedMonth}` : replacedMonth;
    const replacedDay = day.replace(/[^0-9]/g, "");
    const formattedDay =
      parseInt(replacedDay) < 10 ? `0${replacedDay}` : replacedDay;
    // "년.월.일" 형식의 문자열을 반환합니다.
    return `${formattedYear}.${formattedMonth}.${formattedDay}`;
  };
  const onSubmit = async () => {
    if (false) {
    } else {
      try {
        const doc = await addDoc(
          collection(firestoreService, "correctionapplyhistory"),
          {
            applyDate: formatDate(form.year, form.month, form.day),
            content: form.context,
            uid: user?.uid,
            status: "대기",
          },
        );
        console.log(form.year, form.month, form.day, form.context);
        setForm({ year: "2024년", month: "1월", day: "1일", context: "" });
        alert("성공!");
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <Wrapper>
      <div>
        <Title title="정정신청"></Title>
        <SubTitle>날짜</SubTitle>
        <DateRow>
          <Select value={form.year} onChange={handleYearChange}>
            {year.map((it, index) => (
              <option value={it} key={index}>
                {it}
              </option>
            ))}
          </Select>
          <Select value={form.month} onChange={handleMonthChange}>
            {month.map((it, index) => (
              <option value={it} key={index}>
                {it}
              </option>
            ))}
          </Select>
          <Select value={form.day} onChange={handleDayChange}>
            {day.map((it, index) => (
              <option value={it} key={index}>
                {it}
              </option>
            ))}
          </Select>
        </DateRow>
        <SubTitle>내용</SubTitle>
        <TextArea
          onChange={handleContextChange}
          name=""
          id=""
          rows={5}
          value={form.context}
        ></TextArea>
        <ButtonWrap>
          <Button onClick={onSubmit} colorScheme="teal" size="md">
            신청
          </Button>
        </ButtonWrap>
      </div>
    </Wrapper>
  );
};

export default CorrectionApply;
