function generateWord() {
  let result = '';
  const characters = 'WASDQE';
  const charactersLength = characters.length;

  for ( let i=0; i < charactersLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

async function renderWord() {
  const set = generateWord();
  
  set.split('').forEach(word => {
    const wordSpan = document.createElement('span')
    wordSpan.innerText = word
  })

  return set;
}

export default renderWord;