require('./counter.pug');
require('./counter.styl');

const $plus = document.querySelectorAll('.counter__btn_plus');
const $minus = document.querySelectorAll('.counter__btn_minus');

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

for(let i=0; i<$plus.length; i++) {
    $plus[i].addEventListener('click', function(event) {
        let $thisNumber = this.parentNode.querySelector('.counter__number');
        editInput($thisNumber, 'plus');
        event.preventDefault();
    });
}

for(let i=0; i<$minus.length; i++) {
    $minus[i].addEventListener('click', function(event) {
        let $thisNumber = this.parentNode.querySelector('.counter__number');
        editInput($thisNumber, 'minus');
        event.preventDefault();
    });
}
