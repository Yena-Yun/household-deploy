# Household
리액트 가계부 만들기 <br/>

참고사이트: 조종훈 님 블로그 <br/>
https://chojonghoon.github.io/react/report/household/report-household/ <br/>
(타입스크립트 부분은 공부한 후 추가 예정)<br/>

## 구현화면
<img src="https://i.esdrop.com/d/KwrGH1p1Zl/hGLXhRS88d.png" width="500" height="auto">

---
## 요구사항
1. 지출항목(Expense) 계산
  * 지출항목수 : 날짜별 구입한 물건의 수
  * 총지출 : 날짜별 지출금액의 합
  * 잔액 : 수입 - 총지출
    > 잔액이 마이너스인 경우 - 빨강색으로 금액 표기, 앞에 [적자] 표시)
2. 날짜별, 구입처별 내림차순 정렬
3. 기타
  * 금액란 : 천원단위 편집(formatMoney)
  * 지출항목별 번호 : 로마숫자(formatRoman)
 
 
---
## 기존 구현기능
1. Form 입력란 추가(@material-ui의 MuiPickersUtilsProvider)
2. 2단 화면 구현(부모 display: flex, 자식 각각 flex: 1)
3. 각 지출항목 삭제
4. 수입영역의 아이콘 클릭 시 수입 수정
5. local storage 연동<br/>

---
## 내가 추가한 기능
1. 전체적인 디자인 수정
2. 수입수정 아이콘 - 색깔과 크기 조정(props 검색)
3. 전체 폰트 변경(구글폰트 Nanum Gothic Coding)
4. 좌측의 Form 영역을 fixed로 고정

---
## 추가 예정 기능
1. 해당 날짜의 가계부 전체 삭제(- 날짜에 hover 아이콘)
2. 정렬 버튼을 따로 만들어서 가계부 전체를 내림차순 또는 오름차순 정렬


