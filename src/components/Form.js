import React, { useState } from 'react';
import styled from 'styled-components';
import DateFnsUtils from '@date-io/date-fns';
import koLocale from 'date-fns/locale/ko';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { TextField, Button } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const Form = ({ data, setData }) => {
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [place, setPlace] = useState('');
  const classes = useStyles();

  // 가계부에 항목 추가하기
  const handleAdd = () => {
    // 항목 추가 시 id로 넣어줄 maxId 만들기
    const maxId = data.reduce((acc, daily) => {
      const maxDailyId = daily.expenses.reduce((acc, expense) => (expense.id > acc ? expense.id : acc), 0);
      return acc > maxDailyId ? acc : maxDailyId;
    }, 0);

    // 입력된 날짜가 없거나, 가격을 숫자로 바꾼 것이 숫자가 아닐 경우 바로 종료
    if (!date) return;
    if (isNaN(Number(price))) return;

    // 입력된 날짜를 연, 월, 일로 구분하여 문자열로 바꾼 뒤 변수에 담음
    const year = date.getFullYear().toString();
    const month = String(date.getMonth() + 1); // month는 뒤에 1 더해주는 것 때문에 toString()말고 String()으로 묶어줌
    const day = date.getDate().toString();

    // 연, 월, 일 변수들을 합쳐서 strDate 변수 생성
    // (월, 일의 경우 두 자리면 그대로 넣고, 한 자리면 앞에 "0" 추가)
    const strDate = year + (month[1] ? month : '0' + month) + (day[1] ? day : '0' + day);

    // 기존 객체의 date와 입력된 date를 비교하여
    // 기존에 해당 날짜의 항목이 이미 있는지 확인
    // Array.findIndex(): 배열에서 하나씩 꺼내서 조건에 맞는 경우의 인덱스 반환
    const selectDataIndex = data.findIndex((daily) => daily.date === strDate);
    console.log(selectDataIndex);

    // 새로 입력된 날짜를 가진 항목이 없는 경우 => 신규 작성
    if (selectDataIndex === -1) {
      const addedData = [
        // 기존의 daily 항목들은 유지
        ...data,
        // 새로운 daily 객체 추가
        {
          date: strDate, // 날짜는 입력된 날짜
          income: 0, // 수입은 처음엔 0이라고 가정
          expenses: [
            // 비용은
            {
              id: maxId + 1,
              name, // 품목은 입력된 name
              price: Number(price), // 가격은 입력된 price를 숫자로 바꾼 것
              place, // 구입처는 입력된 place
            },
          ],
        },
      ];
      localStorage.setItem('data', JSON.stringify(addedData));
      setData(addedData);

      // 새로 입력된 날짜와 동일한 항목이 이미 존재하는 경우
      // 	=> 객체를 새로 추가 x, 해당 날짜의 날짜를 제외한 다른 항목들만 수정
    } else {
      // 입력한 날짜와 다른 daily 객체들만 filter해서 따로 유지
      const filteredData = data.filter((daily) => daily.date !== strDate);
      // 입력된 날짜와 동일한 daily 객체를 인덱스로 찾아 변수에 담음 (사본 생성)
      const selectData = data[selectDataIndex];

      // 사본 수정 (income은 변동 없으므로 제외)
      // expenses 배열에 입력된 name, price, place로 만들어진 객체를 맨 앞에 추가
      selectData.expenses.unshift({ id: maxId + 1, name, price: Number(price), place });

      // 수정된 데이터를 변수에 담은 뒤
      const modifiedData = [...filteredData, selectData];

      // 로컬스토리지에 추가하고
      localStorage.setItem('data', JSON.stringify(modifiedData));
      // setData에 넣어 App의 data 업데이트
      setData(modifiedData);
    }

    console.log(data);
    console.log(strDate);
  };

  return (
    <Wrapper>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={koLocale}>
        <KeyboardDatePicker
          autoOk
          variant='inline'
          inputVariant='outlined'
          margin='normal'
          fullWidth
          className={classes.textField}
          format='yyyy/MM/dd'
          label='날짜'
          value={date}
          onChange={(date) => setDate(date)}
        />
      </MuiPickersUtilsProvider>
      <br />
      <TextField
        variant='outlined'
        margin='normal'
        fullWidth
        className={classes.textField}
        label='품목'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <TextField
        variant='outlined'
        margin='normal'
        fullWidth
        className={classes.textField}
        label='가격'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />
      <TextField
        variant='outlined'
        margin='normal'
        fullWidth
        className={classes.textField}
        label='구입처'
        value={place}
        onChange={(e) => setPlace(e.target.value)}
      />
      <br />
      <Button onClick={() => handleAdd()} variant='contained' color='primary' fullWidth className={classes.button}>
        추가
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  text-align: center;
  padding-top: 30px;
`;

const useStyles = makeStyles((theme) =>
  createStyles({
    textField: {
      maxWidth: 300,
      backgroundColor: '#fff',
    },
    button: {
      marginTop: theme.spacing(3),
      maxWidth: 300,
    },
  })
);

export default Form;
