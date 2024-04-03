const txtArea = document.querySelector('#txtArea');
const totalBtn = document.querySelector('#totalBtn');
const total = document.querySelector('#total');
const split = document.querySelector('#split');
const shuffleBtn = document.querySelector('#shuffleBtn');
const resultArea = document.querySelector('#resultArea');
const groupBox = document.querySelector('#groupBox');

let totalSentences;

/******************************************/
/* SHUFFLE FUNCTION*/
/******************************************/
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/******************************************/
/* TOTAL SENTENCE FUNCTION */
/******************************************/
const totalSent = (txt) => {
  const txtArray = txt.split('\n');
  const totalNum = txtArray.length;
  return Number(totalNum);
}

/******************************************/
/* SHOW TOTAL SENTENCES */
/******************************************/

totalBtn.addEventListener('click', () => {
  const totalNum = totalSent(txtArea.value); 
  total.innerText = totalNum;
});

/******************************************/
/* SHUFFLE AND SHOW SENTENCES */
/******************************************/

shuffleBtn.addEventListener('click', () => {
  const txtValue = txtArea.value;
  const txtArray = txtValue.split('\n');
  const txtArrayElem = [];
  
  const shuffledArray = shuffle(txtArray);

  let length = 1;
  shuffledArray.forEach((elem) => {  
    const x = `<span class="sentence" data-number=${length}>${elem}</span><br>`;
    length++;
    txtArrayElem.push(x);
  })

  const backtoString = txtArrayElem.join('\n')
  resultArea.innerHTML = backtoString;

  const shuffledSentences = document.querySelector('#resultArea').innerText;
  const splitNum = Number(split.value);
  // const totalSentNum = totalSent(txtValue);
  // const totalGroupNum = Math.ceil(totalSentNum / splitNum);
  

  // console.log(splitNum);
  // console.log(totalSentNum);
  // console.log(totalGroupNum);

  const tempArrayCollection = [];

  if (splitNum === 0) {
    let txtArea = document.createElement('textarea');
    groupBox.append(txtArea);
    groupBox.firstElementChild.value = shuffledSentences;
  } else {
    const backToArray = shuffledSentences.split('\n');
    backToArray.pop();
    let tempArray = [];
    for (let i = 0; i < backToArray.length; i++) {
      if (tempArray.length !== splitNum) {
        tempArray.push(backToArray[i]);
        if (i === backToArray.length - 1) {
          tempArrayCollection.push(tempArray);
        }
      } else {
        tempArrayCollection.push(tempArray);
        tempArray = [];
        tempArray.push(backToArray[i]);
      }
    }
  }

  for (let i = 0; i < tempArrayCollection.length; i++) {
    const singleArr = tempArrayCollection[i];
    console.log(singleArr);
    const arrLength = singleArr.length;

    console.log(arrLength);
    const singleStr = singleArr.join('\n')

    let txtArea = document.createElement('textarea');
    groupBox.append(txtArea);
    groupBox.childNodes[i].value = singleStr;
  }
  


});

/******************************************/
/******************************************/









