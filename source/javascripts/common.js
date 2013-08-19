/*
 * Отработка шаблонизатора и привязанных ко времени рендеринга обработчики датапикера
 */

$(function () {
    $.getJSON('/content.json', function (
        data) {
        var template = $(
            '#question_template').html();
        var html = Mustache.to_html(
            template, data);
        $('.questions').html(html);

        $(function () {
            $(".datepick").datepicker({
                changeMonth: false,
                changeYear: true,
                yearRange: '1980:1998',
                showButtonPanel: false
            });
        });
    });
});

/*
 * Плагин валидации
 */
$(function () {
    $.validator.addMethod(
        "valueNotEquals", function (
            value, element, arg) {
            return arg != value;
        },
        "Value must not equal arg.");
    $('#anketa').validate({
        rules: {
            name: {
                minlength: 2,
                required: true
            },
            email: {
                required: true,
                email: true
            },
            subject: {
                minlength: 2,
                required: true
            },
            recommend: {
                valueNotEquals: "default"
            },
            message: {
                minlength: 2,
                required: true
            },
            agree: "required"
        },
        messages: {
            agree: {
                required: "Согласитесь на всё."
            },
            email: "Введите ваш email.",
            recommend: "Выберите один из вариантов."
        },
        highlight: function (
            element) {
            $(element).closest(
                    '.control-group').removeClass(
                    'success').addClass(
                    'error');
        },
        success: function (element) {
            element.text('OK!').addClass(
                    'valid').closest(
                    '.control-group').removeClass(
                    'error').addClass(
                    'success');
        }
    });
});
jQuery.extend(jQuery.validator.messages, {
    required: "Заполните это поле.",
    remote: "Исправте это поле.",
    email: "E-mail введен не верно.",
    url: "Введите корректный URL.",
    date: "Введите корректную дату.",
    number: "Введите число.",
    digits: "Используйте только цифры."
});

/*
 * Отображение дополнительного поля для варианта селектора
 */
$(function () {
    $('#RecommendBy').on('change',
        function () {
            $('.recommendby__other').hide();
            $('.' + this.value).toggle();
        })
});

