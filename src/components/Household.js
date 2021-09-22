import React from 'react';
import styled from 'styled-components';

const Household = ({ children }) => {
  return (
    <Wrapper>
      {/* children = Daily + Expense */}
      <HouseholdTable>{children}</HouseholdTable>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
`;

// 전체를 표로 생성 - table
const HouseholdTable = styled.table`
  width: 100%;
`;

export default Household;
