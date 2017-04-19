require('./counter.pug');
require('./counter.styl');

const $plus = document.querySelector('.counter__btn_plus');
const $minus = document.querySelector('.counter__btn_minus');

function editInput($thisNumber, operator) {
    let num = parseInt($thisNumber.value);

    if (operator == 'plus') {
        $thisNumber.value = ++num;
    } else {
        if (num > 1) {
            $thisNumber.value = --num;
        }
    }
};

$plus.addEventListener('click', function(event) {
    let $thisNumber = this.parentNode.querySelector('.counter__number');
    editInput($thisNumber, 'plus');
    event.preventDefault();
});

$minus.addEventListener('click', function(event) {
    let $thisNumber = this.parentNode.querySelector('.counter__number');
    editInput($thisNumber, 'minus');
    event.preventDefault();
});
