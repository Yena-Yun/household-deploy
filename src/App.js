import React, { useState } from 'react';
import { data as initialData } from './lib/data.json';
import styled from 'styled-components';
import Household from './components/Household';
import Daily from './components/Daily';
import Expense from './components/Expense';
import Form from './components/Form';

function App() {
  // 로컬스토리지에서 data를 가져옴
  const localData = localStorage.getItem('data');
  // 로컬스토리지에 data가 있으면 JSON화 해서 사용, 없으면 data.json의 데이터 사용
  // (로컬스토리지는 문자열 데이터만 저장)
  const getData = localData ? JSON.parse(localData) : initialData;

  // Form에 로컬스토리지 또는 data.json에서 가져온 data 넘겨주기
  const [data, setData] = useState(getData);
  // modify는 수정할지 '여부'인데 여기서는 수정여부가 해당 칸에 hover를 했는지 안 했는지(css)이므로 modify 자체를 true/false로 판별하기 애매함
  //  => props를 넘길 때 항상 자체적으로 넘어가는 index를 활용
  const [modify, setModify] = useState();

  // 데이터 정렬하기
  const sortedData = data
    // 날짜별 먼저 정렬 (a, b 자체가 객체로 꺼낸 것이어서 daily 사용 x)
    .sort((a, b) => {
      // 문자열이어서 단순한 마이너스 연산은 안됨
      //  => data.sort((a, b) => a.date - b.date) (x)
      // 비교 연산(>, <)은 가능
      if (a.date > b.date) return 1;
      else if (b.date > a.date) return -1;
      else return 0;
    })
    // 이후 구입처별 정렬
    .map((daily) => {
      const sortedExpenses = daily.expenses.sort((a, b) => {
        // 구입처도 문자열이므로 마찬가지로 비교 연산
        if (a.place > b.place) return 1;
        else if (b.place > a.place) return -1;
        else return 0;
      });

      return {
        // 기존 daily 내용에
        ...daily,
        // expenses만 sortedExpenses로 변경
        expenses: sortedExpenses,
      };
    });

  // 삭제하기
  const handleRemove = (id) => {
    const removedData = data.map((daily) => {
      return {
        ...daily,
        expenses: daily.expenses.filter((expense) => expense.id !== id),
      };
    });
    // 로컬스토리지에서도 삭제
    // (로컬스토리지에 삭제가 완료된 데이터를 넣기 위해 문자열화)
    localStorage.setItem('data', JSON.stringify(removedData));
    setData(removedData);
  };

  // 수입 수정하기
  // 수입을 수정하려는 항목의 index와 기존 수입 income을 받아옴
  const handleModifyIncome = (index, income) => {
    // 기존 데이터 보기 -> data에서 하나씩 꺼내서
    const modifiedIncome = data.map((daily, idx) =>
      // 꺼낸 idx가 받아온 index - 1 과 다르다면 => 수정 불가
      idx !== index - 1
        ? // daily(의 기존 income) 그대로 반환
          daily
        : // 같다면 => 수입 수정 가능
          // 받아온 income 넣어주고 나머지 daily 내용은 그대로 유지
          {
            ...daily,
            income,
          }
    );

    // 로컬스토리지에 업데이트
    localStorage.setItem('data', JSON.stringify(modifiedIncome));
    // 수정한 수입이 들어간 data로 data 업데이트
    setData(modifiedIncome);
  };

  return (
    <Wrapper>
      <Title>윤예나 님, 환영합니다!</Title>
      <Container>
        {/* 화면 좌측의 입력 폼 */}
        <Form data={data} setData={setData} />
        <Household>
          {/* Household 안에 sort된 Daily */}
          {sortedData.map((daily, idx) => (
            <Daily
              key={idx}
              index={idx + 1}
              date={daily.date}
              income={daily.income}
              // Array.reduce((acc, cur) => { }, 0) - acc: 누적값, cur: 현재 더할 값
              total={daily.expenses.reduce((acc, cur) => acc + cur.price, 0)}
              // modify는 기존 데이터에서 하나씩 뽑은 각 항목의 idx에 +1 한 값이 넘어감
              // (첫번째 항목은 idx가 0이므로 +1을 해줘야 modify가 0이 되지 않음)
              // (0은 나중에 setModify에서 modify를 'false'로 바꿀 때 사용)
              modify={modify === idx + 1}
              setModify={setModify}
              onModify={handleModifyIncome}
            >
              {/* Daily 안에 Expense */}
              {daily.expenses.map((expense, idx) => (
                <Expense
                  key={idx}
                  id={expense.id}
                  index={idx + 1}
                  name={expense.name}
                  price={expense.price}
                  place={expense.place}
                  onRemove={handleRemove}
                />
              ))}
            </Daily>
          ))}
        </Household>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Nanum Gothic Coding', monospace;
`;

const Title = styled.div`
  height: 7vh;
  font-size: 18px;
  text-align: center;
  line-height: 7vh;
`;

const Container = styled.div`
  display: flex;
  background-color: whitesmoke;
`;

export default App;
