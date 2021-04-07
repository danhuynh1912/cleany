$(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('form').append("<input type='hidden' name='_token' value='"+$('meta[name="csrf-token"]').attr('content')+"'>");

    $('[data-link]').click(function () {
        //console.log($(this).data('link'));
        window.open($(this).data('link'));
    });

    $('.i-collapse').click(function (e) {
        if ($(e.target).hasClass('btn')) {
            e.preventDefault();
            e.stopPropagation();
        }
    });
});
