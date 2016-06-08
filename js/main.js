/**
 * Created by raul on 5/12/16.
 */

jQuery(function($) {

    var appScreens = ["images/matching-screen.png", "images/messages-screen.png", "images/score-screen.png", "images/matching-screen.png"];
    var indexScreen = 0;

    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $(".back-to-top").fadeIn();
        } else {
            $(".back-to-top").fadeOut();
        }

        if ($(this).scrollTop() < 800) {
            setSelectedClass(0);
        }
        if ($(this).scrollTop() >= 800 && $(this).scrollTop() < 1596) {
            setSelectedClass(1);
        }
        if ($(this).scrollTop() >= 1596 && $(this).scrollTop() < 2177) {
            setSelectedClass(2);
        }
        if ($(this).scrollTop() >= 2177 && $(this).scrollTop() < 2400) {
            setSelectedClass(3);
        }
        if ($(this).scrollTop() >= 2400) {
            setSelectedClass(4);
        }
    });

    $('#dLabel').click(function() {
        if ($('.submenu').hasClass('show-menu')) {
            $('.submenu').addClass('hide-menu');
            $('.submenu').removeClass('show-menu');
        }
        else {
            $('.submenu').removeClass('hide-menu');
            $('.submenu').addClass('show-menu');
        }
    });

    $('.button-download').click(function () {
        $('html, body').animate({scrollTop: document.body.scrollHeight}, 'slow', function () { });
    });

    $('.back-to-top').on("click",function() {
        $('html, body').animate({scrollTop: 0}, 'slow', function () { });
    });

    //menu
    $('#home').click(function () {
        $('html, body').animate({scrollTop: 0}, 'slow', function () { });
    });

    $('a#features').click(function () {
        $('html, body').animate({scrollTop: 800}, 'slow', function () { });
        setSelectedClass(1);
    });

    $('a#offer').click(function () {
        $('html, body').animate({scrollTop: 1596}, 'slow', function () { });
        setSelectedClass(2);
    });

    $('a#testimonials').click(function () {
        $('html, body').animate({scrollTop: 2177}, 'slow', function () { });
        setSelectedClass(3);
    });

    $('a#download').click(function () {
        $('html, body').animate({scrollTop: document.body.scrollHeight}, 'slow', function () { });
        setSelectedClass(4);
    });

    function setSelectedClass(item) {
        $('.submenu').addClass('hide-menu');
        $('.submenu').removeClass('show-menu');
        for (var i = 1; i <= 4; i++) {
            if (i == item) {
                $('#menu' + i).addClass('selected');
            }
            else {
                $('#menu' + i).removeClass('selected');
            }
        }
    }

    var descriptions = [
        {
            title: "Your perfect match!",
            desc: "Our powerful matchmaking algorithm calculates potential matches for you, depending on different criteria. It allows you to reach new people around that you might end up getting well along with."
        },
        {
            title: "Open messages",
            desc: "At Erosify, we believe in the power of words, that's why we allow you to send private messages to any user you find on your way, even if you are not a mutual matches just yet. Keep in touch wherever you go, whenever you want."
        },
        {
            title: "Erosify Score®",
            desc: "Your Erosify Score® tells you how popular you are on the app. Every profile like helps your score to go up based on a math formula. The more likes you get, the higher your Erosify Score® will be."
        },
        {
            title: "Erosify Events™",
            desc: "Whether you're looking for things to do around, or you're one of those who enjoy moving masses, Erosify Events™ is a better way to go out with friends and find new ones."
        }
    ];

    (function () {
        if (document.querySelector('.circles-container')) {
            setTimeout(function () {
                document.querySelector('.slider-section h1').className = '';
                document.querySelector('.slider-section p').className = '';
            }, 1000);

            var buttons = document.querySelector('.circles-container').children;
            for (var i = 0, len = buttons.length; i < len; ++i) {
                $(buttons[i]).click(function (ev) {
                    indexScreen = parseInt(ev.target.id);
                    changeSlide(indexScreen);
                });
            }
        }
    }());

    (function () {
        if (document.querySelector('.arrow-right')) {
            $('.arrow-right').click(function () {
                indexScreen++;
                if (indexScreen == 4) {
                    indexScreen = 0;
                }
                changeSlide(indexScreen);
            });
        }
        if (document.querySelector('.arrow-left')) {
            $('.arrow-left').click(function () {
                indexScreen--;
                if (indexScreen < 0) {
                    indexScreen = 3;
                }
                changeSlide(indexScreen);

            });
        }
    }());

    function changeSlide(index) {
        changeBtnClass(index);
        $('.phone-container img').attr("src", appScreens[index]);
        document.querySelector('.slider-section h1').innerHTML = descriptions[index].title;
        document.querySelector('.slider-section p').innerHTML = descriptions[index].desc;
    }

    function changeBtnClass(id) {
        if (document.querySelector('.circles-container')) {
            var buttons = document.querySelector('.circles-container').children;
            for (var i = 0, len = buttons.length; i < len; ++i) {
                if (i == id) {
                    buttons[i].className += " selected";
                    document.querySelector('.slider-section h1').className = 'animated slideInRight';
                    document.querySelector('.slider-section p').className = 'animated slideInRight';
                    setTimeout(function () {
                        document.querySelector('.slider-section h1').className = '';
                        document.querySelector('.slider-section p').className = '';
                    }, 1000);
                }
                else {
                    buttons[i].className = buttons[i].className.replace('selected', '');
                }
            }
        }
    }

    $('#signup-users-form').submit(function(event) {
        event.preventDefault();
        $('#loadingRequest').show();
        postNewsletterToGoogle();
        $('.send-email-btn').prop('disabled', true);
        $('#email').prop('disabled', true);
    });

    // form validation
    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function postNewsletterToGoogle() {
        var email = $('#email').val();

        if ((email !== "") && (validateEmail(email))) {
            $.ajax({
                url: "http://erosify-server.herokuapp.com/api/v1/addsubscriber",
                data: {"email": email, "ip": myip},
                type: "POST",
                dataType: "JSON",
                statusCode: {
                    0: function () {
                        $('#email').val("");
                        $('#loadingRequest').hide();
                        $('#success-alert').show();
                        $('.send-email-btn').prop('disabled', false);
                        $('#email').prop('disabled', false);
                        setTimeout(function () {
                            $('#success-alert').hide();
                        }, 4000);
                    },
                    200: function () {
                        $('#email').val("");
                        $('#loadingRequest').hide();
                        $('#success-alert').show();
                        $('.send-email-btn').prop('disabled', false);
                        $('#email').prop('disabled', false);
                        setTimeout(function () {
                            $('#success-alert').hide();
                        }, 4000);
                    }
                }
            });
        }
        else {
            //Error message
            console.log('Error on Submit.');
        }
    }
});