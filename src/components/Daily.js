import React, { useState } from 'react';
import styled from 'styled-components';
import formatDate from '../lib/formatDate';
import formatMoney from '../lib/formatMoney';
import EditIcon from '@material-ui/icons/Edit';

const Daily = ({ index, children, date, income, total, modify, setModify, onModify }) => {
  // 수입 초기값: string 형태의 income (사용자에 의해 입력된 값은 '문자열'로 간주하므로)
  const [incomeValue, setIncomeValue] = useState(String(income));

  // 엔터 처리
  const handleKeyDown = (e) => {
    // (엔터키 대신) 다른 특정 키보드 누른 경우 새로고침 막기
    // 69: e(소문자 e) , 190: '.'(마침표) , 109: '-(숫자패드 빼기)', 189: '-'(대쉬)
    // (계산기에서 e -> 10의 지수 (예: 2.5e13), 마침표는 소수점)
    if (e.keycode === 69 || e.keycode === 190 || e.keycode === 109 || e.keycode === 189) {
      e.preventDefault();
    }

    // ** 엔터키를 누른 경우
    if (e.key === 'Enter') {
      // 수입수정: 받아온 index와 사용자가 입력한 incomeValue(문자열)를 Number화 해서 넣어줌
      onModify(index, Number(incomeValue));
      // 마우스 hover 여부 -> (인덱스로 처리중) 0으로 초기화
      setModify(0);
    }
  };

  return (
    <tbody>
      <tr>
        {/* rowspan: 세로로 병합 */}
        <IndexTd rowSpan={children.length + 5}>{index}</IndexTd>
        <FieldTd align='center'>{formatDate(date)}</FieldTd>
        <FieldTd align='center'>수입</FieldTd>
        <FieldTd align='left' colSpan={2}>
          &nbsp;
          {/* 연필 아이콘을 클릭하여 modify값이 존재할 때 */}
          {modify ? (
            // 수입을 수정할 input창 나타남
            <IncomeTextField
              // 주의: type이 number라고 해서 입력값이 '숫자'로 바뀌는 게 아니라 input창 옆에 위아래 증감버튼이 생길 뿐
              // 기본적으로 input창에 입력되는 값은 '문자열' -> 숫자로 바꾸는 건 Number(), parseInt() 통해 따로 처리 필요)
              type='number'
              // value는 incomeValue
              value={incomeValue}
              // setIncomeValue에 입력된 값(e.target.value)을 넣어 incomeValue 업데이트
              onChange={(e) => setIncomeValue(e.target.value)}
              // 엔터 처리
              onKeyDown={handleKeyDown}
            />
          ) : (
            // 연필 아이콘을 아직 클릭 안 해서 modify값이 없을 때
            <>
              {/* 현재 income 보여주기 */}
              {formatMoney(income)}

              {/* 연필 아이콘에 onClick 이벤트 미리 넣어둠 */}
              <ModifyButton
                // 아이콘 클릭 시
                onClick={() => {
                  // 기존 수입이 input에 미리 들어가 있도록 하고(input 안의 값은 문자열)
                  setIncomeValue(String(income));
                  // setModify에 index 넣어서 modify값이 존재하게 함
                  setModify(index);
                }}
              >
                <EditIcon color='action' fontSize='small' />
              </ModifyButton>
            </>
          )}
        </FieldTd>
      </tr>
      <tr>
        <FieldTd align='center'>번호</FieldTd>
        <FieldTd align='center'>품목</FieldTd>
        <FieldTd align='center'>가격</FieldTd>
        <FieldTd align='center'>구입처</FieldTd>
      </tr>

      {/* Expense(지출항목) 컴포넌트 들어갈 자리 */}
      {children}

      <tr>
        <ResultTd align='center'>지출항목수</ResultTd>
        {/* colspan: 가로로 병합 */}
        <ResultTd align='left' colSpan={3}>
          {/* (= Expense 길이) */}
          &nbsp;{children.length}
        </ResultTd>
      </tr>
      <tr>
        <ResultTd align='center'>총지출</ResultTd>
        <ResultTd align='left' colSpan={3}>
          {/* 총지출 금액을 천 단위로 구분 */}
          &nbsp;{formatMoney(total)}
        </ResultTd>
      </tr>
      <tr>
        <ResultTd align='center'>잔액</ResultTd>
        {/* minus props에 조건문 (income이 total보다 적을 때만 true) */}
        <ResultTd align='left' colSpan={3} minus={income < total}>
          {/* 잔액이 minus이면 앞에 "[적자]" */}
          {income < total ? '[적자]' : null}
          {/* 잔액 = 수입 - 총지출 */}
          &nbsp;{formatMoney(income - total)}
        </ResultTd>
      </tr>
    </tbody>
  );
};

// 맨 왼쪽의 항목별 번호
const IndexTd = styled.td`
  background: #835151;
  color: #fff;
  text-align: center;
  width: 20px;
`;

// 연필 아이콘 있는 영역 (연필 아이콘 = <EditIcon/>)
const ModifyButton = styled.div`
  float: right;
  /* hover 하기 전에는 렌더 트리에 요소 자체가 없어야 함 */
  display: none;
  cursor: pointer;
`;

// 항목별 품목, 가격, 구입처 등 필드 영역
const FieldTd = styled.td`
  background: #c2f784;
  color: #000000;
  text-align: ${(props) => props.align};
  height: 26px;

  /* 필드 영역에 마우스 hover하면 연필 아이콘 등장 */
  &:hover ${ModifyButton} {
    display: block;
  }
`;

// 항목별 아래 지출항목수, 총지출, 잔액
const ResultTd = styled.td`
  background: #ffc1c1;
  color: ${(props) => (props.minus ? '#ff0000' : '#000')};
  text-align: ${(props) => props.align};
  height: 26px;
`;

// 수입 수정 input
const IncomeTextField = styled.input`
  border: none;
  background: transparent;
  width: 100%;
  font-size: 16px;
`;

export default Daily;
