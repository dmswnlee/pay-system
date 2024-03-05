import styled from 'styled-components';

import Title from '../components/Title';

const Wrapper = styled.div`
  padding-top: 58px;
`;

const DateRow = styled.div`
  display: flex;
`;
const Select = styled.select`
  border: solid 1px #e2e8f0;
  padding: 8px 16px;
`;
const CorrectionApply = () => {
  return (
    <Wrapper>
      <div>
        <Title title="정정신청"></Title>
        <h2>날짜</h2>
        <DateRow>
          <Select name="year" id="year">
            <option value="2022년">2022년</option>
            <option value="2023년">2023년</option>
            <option value="2024년">2024년</option>
          </Select>
          <select name="month" id="month">
            <option value="1월">1월</option>
            <option value="2월">2월</option>
            <option value="3월">3월</option>
          </select>
          <select name="day" id="day">
            <option value="1일">1일</option>
            <option value="2일">2일</option>
            <option value="3일">3일</option>
          </select>
        </DateRow>
        <h2>내용</h2>
        <textarea name="" id="" rows={10}></textarea>
      </div>
    </Wrapper>
  );
};

export default CorrectionApply;
