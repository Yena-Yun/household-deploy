# Household
리액트 가계부 만들기 <br/>

참고사이트: 조종훈 님 블로그 <br/>
https://chojonghoon.github.io/react/report/household/report-household/ <br/>
(블로그에서는 타입스크립트도 사용. 추후 공부 후 추가할 예정)<br/>

---
## 요구사항
1. 빨강색 박스의 내용 계산
  * 개수 : 날짜별 구입한 물건의 수
  * 총 지출 : 날짜별 품목 가격의 합
  * 잔액 : 날짜별 수입 - 총 지출
    > 단, 잔액이 마이너스일 경우 2019/12/03일의 경우처럼 빨강색으로 [적자]라는 표시와 금액을 표시할 것)
2. 기타
  * 금액란은 천원단위 편집
  * 각 항목은 예시 화면처럼 정렬(중앙, 좌측, 우측)
  * 날짜별로 구입처별 내림차별 정렬하여 표시(데이터는 무작위 입력)<br/>
 
 
---
## 구현기능
1. 잔액 마이너스일 경우 빨간색으로 [적자] 표시
2. 날짜별 구입처별 내림차순 정렬
3. 우측에 Form 추가 (css로 2단 화면 구현)
4. Form을 통해 날짜별 가계부 추가 기능
5. 각 지출항목에 hover 시 삭제 기능
6. 수입란 클릭 시 수입 수정 기능
7. local storage 연동<br/>

---
## 컴포넌트 구분
<img src="https://i.esdrop.com/d/KwrGH1p1Zl/v5nSLzxOqX.png" width="350" height="auto"> <br/>
1. Household(빨간색) : 전체 컨테이너
2. Daily(주황색) : 날짜별 수입 및 지출내역
3. Expense(보라색) : 같은 날짜 내의 하나의 지출항목<br/>

---
## 완성본
<img src="https://i.esdrop.com/d/KwrGH1p1Zl/Yb6jTbLH3M.png" width="500" height="auto">
