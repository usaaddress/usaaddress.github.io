(function(_w) {

    var w = _w;

    //main namespace
    G = {};
    G.Config = {

    };

    G.Fun = {
        area_refresh: function(){
            var count = G_AREA.length;
            var index = Math.floor(Math.random() * count);
            var rows = G_AREA[index];

            $('.result-box').empty();
            $.each(rows['data_config'], function(i){
                var row = rows['data_config'][i];
                var key = row['key'];
                var dl = $('<dl></dl>');
                dl.append('<dt><h3>'+row['value']+'</h3></dt>');
                $.each(rows['data'][key], function(j){
                    var data_row = rows['data'][key][j];
                    var dd = $('<dd></dd>');
                    dd.append('<label>'+data_row['key_name']+'</label>');
                    dd.append('<span><b>'+data_row['value']+'</b></span>');
                    dl.append(dd);
                })

                $('.result-box').append(dl);
            })
        },
        init: function() {
            $(".gotop").click(function(e) {
                $('body,html').animate({ scrollTop: 0 }, 500);
                return false;
            });

            $('.xccms-guestbook-box .header').click(function(){
                var that = $(this).find('a');
                if ($('.xccms-guestbook-box .body').is(':hidden'))
                {
                    that.find('use').attr('href', '#minus');
                    $('.xccms-guestbook-box .body').show();
                    $('.xccms-guestbook-box').removeClass('closed');
                    $.cookie('SET_GUESTBOOK_CLOSE', 0, { expires: 1, path: '/' });
                }
                else
                {
                    that.find('use').attr('href', '#rectangle-one');
                    $('.xccms-guestbook-box .body').hide();
                    $('.xccms-guestbook-box').addClass('closed');
                    $.cookie('SET_GUESTBOOK_CLOSE', 1, { expires: 1, path: '/' });
                }
            });

            $('.xccms-guestbook-box form').submit(function(e){
                e.preventDefault();
                var that = $(this);
                $.post(
                    that.attr('action'),
                    {
                        realname: $('#realname').val(),
                        tel: $('#tel').val(),
                        email: $('#email').val(),
                        content: $('#content').val(),
                        captcha: $('#captcha').val(),
                        page_code: $('#page_code').val(),
                        page_id: $('#page_id').val()
                    },
                    function(d){
                        console.log(d);
                        if (d['code'] == 1)
                        {
                            $('#realname, #tel, #email, #content, #captcha').val('');
                        }
                        $('#captcha-image').click();
                        $('.xccms-guestbook-box .body .result-box').show();
                        $('.xccms-guestbook-box .body .result-box div span').text(d['msg']);

                        setTimeout(function(){
                            $('.xccms-guestbook-box .body .result-box').hide();
                        }, 2000);
                    }
                    ,'json'
                );
            })

            G.Fun.area_refresh();

        }
    };

    $(function() {
        G.Fun.init();
    });
})();