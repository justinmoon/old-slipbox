export function insertAtCursor(myField, myValue) {
  //IE support
  if (document.selection) {
      myField.focus();
      sel = document.selection.createRange();
      sel.text = myValue;
  }
  //MOZILLA and others
  else if (myField.selectionStart || myField.selectionStart == '0') {
      var startPos = myField.selectionStart;
      var endPos = myField.selectionEnd;
      myField.value = myField.value.substring(0, startPos)
          + myValue
          + myField.value.substring(endPos, myField.value.length);
      myField.selectionStart = startPos + myValue.length;
      myField.selectionEnd = startPos + myValue.length;
  } else {
      myField.value += myValue;
  }
}

export function getId(text, position) {
    let id = ''
    let current = position;
    // count up
    let start = undefined
    let end = undefined
    console.log(text, position)
    while (current < text.length) {
        console.log(text.slice(current, current+2))
        if (text.slice(current, current+2) === ']]') {
            end = current
            break
        }
        current = current + 1
    }
    current = position
    // count down
    while (current >= 0) {
        console.log(text.slice(current-1, current-3))
        if (text.slice(current-2, current) === '[[') {
            start = current
            break
        }
        current = current - 1
    }
    console.log(start, end)
    return text.slice(start, end)
}