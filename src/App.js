import './App.css';
import { useState } from 'react';

const INITIAL_VALUE = "a 1-5: abcdj z 2-4: asfalseiruqwo b 3-6: bhhkkbbjjjb";

function App() {
  const [value, setValue] = useState(INITIAL_VALUE);
  const [countValidPassword, setCountValidPassword] = useState(0);
  const [isShowCount, setShowCount] = useState(false);
  const [error, setError] = useState(false);

  const getCountValidPassword = () => {
    if (!Number.isInteger(value.trim().split(" ").length / 3)) {
      setError(true);
      return;
    }

    const arrObjectPasswords = createListConfigPassword(value.trim())
    const result = arrObjectPasswords.filter((item) => {
      const countCurrentSymbol = item.password.split("").filter((sym) => sym === item.currentSymbol).length;

      return item.min <= countCurrentSymbol && countCurrentSymbol <= item.max;
    })

    setShowCount(true)
    setError(false)
    setCountValidPassword(result.length)
  }

  const createListConfigPassword = (str) => {
    let newArr = [];
    const arr = str.split(" ");

    for (let i = 0; i < arr.length / 3; i++) {
      const currentItem = i * 3;
      const passwordInfo = {
        currentSymbol: arr[currentItem],
        min: Math.min.apply(null,getAllNumbersInArr(arr[currentItem + 1])),
        max: Math.max.apply(null,getAllNumbersInArr(arr[currentItem + 1])),
        password: arr[currentItem + 2]
      }

      newArr.push(passwordInfo)
    }
    
    return newArr;
  }

  const getAllNumbersInArr = (str) => {
    return str.match(/\d+/g).map((item) => Number(item));
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="Wrap-info">
          <p>You can enter your own data set</p>
          <p>but be warned, the format should be: </p>
          <p>"a" or other character by which the check will be performed</p>
          <p>then range like "1-5:"</p>
          <p>and finally the password itself, and don't forget, all values should be separated by a space.</p>
        </div>
        <textarea className={error ? "error" : ""} value={value} onChange={(e) => setValue(e.target.value)}/>
        { error && <span>The format you entered is not correct</span>}
        <button onClick={() => getCountValidPassword()}>Get Results</button>
        {isShowCount && !error && <h1 className='Count'>Count valid password {countValidPassword}</h1>}
      </header>
    </div>
  );
}

export default App;
