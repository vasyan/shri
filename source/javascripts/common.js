$(function() {
  $.getJSON('/content.json', function(data) {
    var template = $('#question_template').html();
    var html = Mustache.to_html(template, data);
    $('.questions').html(html);
      $(function(){
          $(".datepick").datepicker({
              changeMonth: false,
              changeYear: true,

              yearRange: '1950:2013',
              showButtonPanel: false
          });

      });
  });

  $('#q-form').validate({
      errorPlacement: function(error, element) {
          offset = element.offset();
          error.insertBefore(element)
          error.addClass('validation-error-message');
          error.css('position', 'relative');

      }
  });
});
$(document).ready(function(){
    $("span.tester").addClass("second");


})

$(function(){
    $(".datepick").datepicker();
});



jQuery.extend(jQuery.validator.messages, {
    required: "Заполните это поле.",
    remote: "Исправте это поле.",
    email: "E-mail введен не верно.",
    url: "Введите корректный URL.",
    date: "Введите корректную дату.",
    number: "Введите число.",
    digits: "Используйте только цифры.",
    equalTo: "Please enter the same value again.",
    accept: "Please enter a value with a valid extension.",
    maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
    minlength: jQuery.validator.format("Please enter at least {0} characters."),
    rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
    range: jQuery.validator.format("Please enter a value between {0} and {1}."),
    max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
    min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});





