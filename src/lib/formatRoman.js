const formatRoman = (num) => {
  // 반환할 로마숫자 (string)
  let roman = '';

  // 로마숫자를 key: value 형식으로 가져옴
  const romanNumList = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XV: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  // a를 전역변수로 선언 (for문이 돌 때마다 매번 선언하지 않도록?)
  let a;

  // for-in문
  // key: value 여러 개로 이루어진 객체에서 프로퍼티(key)를 꺼냄
  // (value는 '객체[key]'로 가져옴)
  for (let key in romanNumList) {
    // a는 받아온 num을 romanList의 value들로 일일이 나눈 값
    a = Math.floor(num / romanNumList[key]);

    // a가 0보다 크다면 (음수가 아니라면?)
    if (a >= 0) {
      // a 길이만큼 한 번 더 돌면서
      for (let i = 0; i < a; i++) {
        // roman 변수에 key를 더해줌 (=> 로마숫자 생성?)
        roman += key;
      }
    }

    // if문에 안 걸리면 num은 num을 romanList의 value로 나눈 나머지 (= 일의 자리?)
    num = num % romanNumList[key];
    // 그리고 이 num으로 for문을 한 번 더 돈다
  }

  // 최종 생성된 로마숫자 반환
  return roman;
};

export default formatRoman;
