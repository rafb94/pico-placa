export const licensePlate = {
    input: document.querySelector('#licensePlate'),
    value: document.querySelector('#licensePlate').value,
    checkLetters: function(currentVal) {
        currentVal = currentVal.replace(/[0-9]/g, '');
        if(checkLength(currentVal, 3)){
            lettersRight = true;
        } else{
            lettersRight = false;
        }
    },
    checkNumbers : function(currentVal){
        currentVal = currentVal.replace(/\D/g,'');
        if(checkLength(currentVal, 3)){
            numbersRight = true;
        } else{
            numbersRight = false;
        }
    }
}