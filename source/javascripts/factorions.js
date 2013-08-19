function sumMembersFactorials(num) {
    var digits = ('' + num).split('');
    var sum = 0;

    for (var i = 0; i < digits.length; i++) {
        sum += getFactorial(digits[i]);
    }

    return sum;
}

function listOfFactorions() {
    var max_number = 7 * getFactorial(9);

    for (var i = 1; i <= max_number; i++) {
        if (i == sumMembersFactorials(i)) {
            console.log(i)
        };
    }
}

function getFactorial(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * getFactorial(num - 1);
    }
}

listOfFactorions();


function getFactorions() {
    return [1, 2, 145, 40585]
};

function init() {
    var i = 0;
    $('#calc-factorions').click(function(){
        if (i <= 0) {
            var factorions = getFactorions(),
                container = $('.list-of-all-factorions');

            $.each(factorions, function(index, elem){
                container.append("<li> >>> " + elem + "</li>");
            });
        }
        i++;
    });
}

$(function(){
    init();
});

$('#calc-factorions').click(function(){
    $('.hidden-content').addClass('no-hidden');
});