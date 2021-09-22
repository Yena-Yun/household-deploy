// 어떤 함수를 처리해서 값을 반환(return)하는 게 아니라
// 단순히 들어온 숫자값을 문자열로 바꿔서 쉼표 찍어주는 기능만 하는 컴포넌트
//  => return문 없고, 즉 함수가 아니므로 {}를 쓰지 않는다.
const formatMoney = (money) => money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export default formatMoney;
