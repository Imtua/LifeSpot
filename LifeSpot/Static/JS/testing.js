function getValue()
{
    return document.getElementsByTagName('input')[0].value.toLowerCase()
}

function saveValue()
{
    let currentInput = getValue()

    alert('Последний ввод: ' + this.lastInput === undefined ? 'Значение отсутствует' : this.lastInput
        + '\n' + 'Текущий ввод: ' + currentInput)

    this.lastInput = currentInput
}

