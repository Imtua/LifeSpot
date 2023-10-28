function prevClick()
{ 
    let prevSlide = document.querySelector('.active').previousElementSibling;
    changeSlide(prevSlide);
}

function nextClick()
{
    let nextSlide = document.querySelector('.active').nextElementSibling;
    changeSlide(nextSlide);
}

function changeSlide(slide)
{
    if (slide == null)
        return;

    removeActiveSlide();
    slide.classList.add('active');
}

function removeActiveSlide()
{
    document.querySelectorAll('.slide').forEach((slide,) => {
        slide.classList.remove('active')
    });
}

function Comment()
{
    this.author = prompt("Введите ваше имя")

    if (this.author == null) {
        this.empty = true
        return
    }

    this.text = prompt("Ваш отзыв")

    if (this.text == null) {
        this.empty = true
        return
    }

    this.date = new Date().toLocaleDateString()
}

function addReview()
{
    let comment = new Comment()

    if (comment.empty)
    {
        return
    }

    let isReview = confirm("Разрешить пользователям оценивать ваш отзыв?")

    if (isReview)
    {
        let review = Object.create(comment)
        review.rate = 0

        writeReview(review)
    }
    else
    {
        writeReview(comment)
    }

}

const writeReview = review =>
{
    let rateCounter = '';

    if (review.hasOwnProperty('rate'))
    {
        let buttonId = Math.random();

        rateCounter += `
        <div>
            <b style="color: chocolate">Рейтинг:</b>` +
            `<button id="${buttonId}" data-rating ="${review.rate}" class = "like-reaction" onclick = "addLike(${buttonId})">❤️ ${review.rate}</button>
        </div>`
    }

    document.getElementsByClassName('reviews')[0].innerHTML += '    <div class="review-text">\n' +
        `<p> <i> <b>Пользователь ${review.author}</b> ${review.date}</i></p>` + 
        `<p class = "review-text-p">${review.text}</p>` +
        `${rateCounter}` +
        '</div>';
}


function addLike(id)
{
    let elementHandler = document.getElementById(id);
    let rating = parseInt(elementHandler.dataset.rating) + 1;

    elementHandler.dataset.rating = rating;
    elementHandler.innerHTML = `❤️ ${rating}`;
}