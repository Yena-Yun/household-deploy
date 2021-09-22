import React from 'react';
import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';
import formatRoman from '../lib/formatRoman';

const Expense = ({ id, index, name, price, place, onRemove }) => {
  return (
    <Wrapper>
      {/* 로마숫자 옆에 '.'을 붙여 띄워주는 센스 */}
      <ExpenseTd align='center'>{formatRoman(index)}.</ExpenseTd>
      <ExpenseTd align='center'>{name}</ExpenseTd>
      <ExpenseTd align='left'>&nbsp;{formatMoney(price)}</ExpenseTd>

      {/* 구입처 블록 영역에 삭제버튼 컴포넌트 추가 */}
      <ExpenseTd align='left'>
        &nbsp;{place}
        {/* 삭제버튼 - 클릭 시 삭제함수 호출 ('x'문자 = $times; - 글자로 취급, 색상변경 가능) */}
        <RemoveButton onClick={() => onRemove(id)}>&times;</RemoveButton>
      </ExpenseTd>
    </Wrapper>
  );
};

// 다른 컴포넌트와 형태 맞추기 위해 + tr 넣기 위해 Wrapper 선언
// styled에서 아무 스타일 안 줄 수도 있음
const Wrapper = styled.tr``;

const ExpenseTd = styled.td`
  background: #fff47d;
  color: #000000;
  text-align: ${(props) => props.align};
  height: 26px;
`;

const RemoveButton = styled.div`
  /* $times;(x 문자) - 빨간색 */
  color: #ff0000;
  /* float: 주변 요소에 영향 안 주고 정렬 */
  float: right;
  margin-right: 4px;
  cursor: pointer;

  // hover 전에는 안 보임(렌더링 자체가 되지 않음)
  display: none;
  // Expense 영역(Wrapper)에 hover 시 등장 (사이에 &: '~하면(and)')
  ${Wrapper}:hover & {
    display: block;
  }
`;

export default Expense;
