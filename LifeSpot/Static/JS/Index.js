function filterContent() {

    let elements = document.getElementsByClassName('video-container');

    for (let i = 0; i <= elements.length; i++)
    {
        let videoText = elements[i].querySelector(".video-title").innerText;

        if (!videoText.toLowerCase().includes(inputParseFunction().toLowerCase()))
        {
            elements[i].style.display = 'none';
        }
        else
        {
            elements[i].style.display = 'inline-block';
        }
    }
}

const sessionInfo = function ()
{
    console.log('Начало сессии: ' + window.sessionStorage.getItem("StartDate"))
    console.log('Даныне клиента: ' + window.sessionStorage.getItem("UserAgent"))
    console.log('Возраст пользователя: ' + window.sessionStorage.getItem("UserAge"))
}

function handleSession()
{
    if (!sessionStorage.getItem("StartDate"))
    {
        sessionStorage.setItem("StartDate", new Date().toLocaleString())
    }

    if (!sessionStorage.getItem("UserAgent"))
    {
        sessionStorage.setItem("UserAgent", window.navigator.userAgent);
    }

    if (!sessionStorage.getItem("UserAge"))
    {
        let age = prompt('Введите ваш возраст')
        sessionStorage.setItem("UserAge", age)

        checkAge(false)
    }
    else
    {
        checkAge(true)
    }
}

function checkAge(isVisited) {

    if (sessionStorage.getItem("UserAge") >= 18)
    {
        if (!isVisited)
        {
            alert('Приветствуем на LifeSpot !' + '\n' + 'Текущее время: ' + new Date().toLocaleString());
        }
    }
    else
    {
        alert("Наши трансляции не предназначены для лиц младше 18 лет, вы будете перенаправлены.");
        window.location.href = "http://www.google.com"
    }
}