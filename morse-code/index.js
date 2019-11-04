function flatten(array){
  return array.reduce((all_signals,signals)=>{
    if(Array.isArray(signals)){
      all_signals.push(...signals)
    }else{
      all_signals.push(signals)
    }
    return all_signals
  },[])
}
function transmitter({
  codes,
  message,
  timeouter,
  toggle
},callback){
  /*
    1. dot duration is the baseline timing measurement
    2. dashes are timed as 3 dots
    3. time between each dot or dash in the same letter is 1 dot
    3. time between letters are 3 dots
    4. time between words are 7 dots
  */
  function wait(next,duration){
    timeouter(()=>{
      next()
    },duration)
  }
  const word_space = (next)=>wait(next,7)
  const letter_space = (next)=>wait(next,3)
  const signal_space = (next)=>wait(next,1)
  function signal(next,duration){
    toggle()
    timeouter(()=>{
      toggle()
      next()
    },duration)
  }
  const dot = (next)=> signal(next,1)
  const dash = (next)=> signal(next,3)

  function letter(l){
    const morse_rep = codes[l].split('')
    const dot_or_dash = (d)=>(d === '.') ? [dot,signal_space] : [dash,signal_space]
    const morse_signals = flatten(morse_rep.map(dot_or_dash))
    morse_signals.pop() // remove the last signal_space (it is at the end of the letter)
    morse_signals.push(letter_space)
    return morse_signals
  }
  function word(w){
    if(w.length > 0){ //do not convert empty spaces into signals
      const letters = w.split('')
      const morse_signals =  flatten(letters.map(letter))
      morse_signals.pop() // remove the last letter_space (it is at the end of the word)
      morse_signals.push(word_space)
      return morse_signals
    }
    return []
  }

  const words = message.split(' ')
  const morse_signals = flatten(words.map(word))
  morse_signals.pop() // remove the last word_space (it is at the end of the message)

  function send(){
    if(morse_signals.length  > 0){
      const next = morse_signals.shift()
      next(send)
    }else{
      callback()
    }
  }
  send()
};
module.exports = transmitter

