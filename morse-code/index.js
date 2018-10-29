module.exports = function morseGenerator({
    codes,
    message,
    timeouter,
    toggle
  } = options,doneFunc){
    function sendSignal(morse,singalInd,cb){
      toggle()
      let length
      if(morse[singalInd] === '.'){
        length = 1
      }else if(morse[singalInd] === '-'){
        length = 3
      }
      timeouter(()=>{
        toggle()
        if(singalInd+1 < morse.length) {
          timeouter(()=>{
            sendSignal(morse,singalInd+1,cb)
          },1)
        }else{ //end of the letter
          console.log(morse)
          cb(morse)
        }
      },length)
    }
    function sendWord(word,letterInd,cb){
      const morse = codes[word[letterInd]]
      sendSignal(morse,0,()=>{
          if(letterInd+1 < word.length) {
              timeouter(()=>{
                sendWord(word,letterInd+1,cb)
              },3)
          }else{ //end of the word
            console.log(word)
            cb(word)
          }
      })
    }

    const words = message.split(' ')

    function send(wordInd){
      sendWord(words[wordInd],0,()=>{
        if(wordInd+1 < words.length) {
          timeouter(
            ()=>send(wordInd+1)
            ,7
          )
        }else{
          doneFunc()
        }
      })
    }
    send(0)    
}
