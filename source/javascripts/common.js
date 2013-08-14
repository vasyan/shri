$(function() {
  $.getJSON('/content.json', function(data) {
    var template = $('#question_template').html();
    var html = Mustache.to_html(template, data);
    $('.questions').html(html);
  });
  $('#q-form').validate();
});
$(document).ready(function(){

    $("span.tester").addClass("second");

})