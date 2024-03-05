import styled from 'styled-components';

const Text = styled.h1`
  font-size: 32px;
`;

type Title = {
  title: string;
};

const Title = ({ title }: Title) => {
  return <Text>{title}</Text>;
};

export default Title;
