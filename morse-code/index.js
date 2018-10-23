/* todo create a version using generators and promises */
module.exports = function({
    codes,
    message,
    timeouter,
    toggle
  } = options, doneFunc){
    const words = message.split(' ')
    function sendLetterBurst(morseRepresentation,signalLoc,doneSendingLetter){
        const signal = morseRepresentation[signalLoc]
        const signalLength = signal === '-' ? 3 : 1 
        toggle() //start
        timeouter(()=>{
            toggle() //end
            if(signalLoc + 1 < morseRepresentation.length){
                //time between each dot or dash in the same letter is 1 dot
                timeouter(()=>{
                    sendLetterBurst(morseRepresentation,signalLoc + 1,doneSendingLetter)
                },1)
            }else{
                doneSendingLetter()
            }
        },signalLength)
    }
    function sendWordBurst(word,upToChar,doneWordFunc){
        const char = word[upToChar]
        const morseRepresentation = codes[char]      
        console.log(char,morseRepresentation)  
        sendLetterBurst(morseRepresentation,0,()=>{
            if(upToChar + 1 < word.length){
                // time between letters are 3 dots
                timeouter(()=>sendWordBurst(word,upToChar + 1,doneWordFunc),3)
            }else{
                doneWordFunc()
            }
        })
    }
    function transmit(wordIndex){
        if(words[wordIndex].length > 0){
            sendWordBurst(words[wordIndex],0,()=>{
                if(wordIndex + 1 < words.length){
                    // time between words are 7 dots
                    timeouter(()=>transmit(wordIndex + 1),7)
                }else{
                    doneFunc()
                }
            })
        }else{  
            // skip multiple spaces
            transmit(wordIndex + 1)
        }
    }
    transmit(0)
}