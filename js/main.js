/**
 * Created by raul on 5/12/16.
 */

jQuery(function($) {

    var descriptions = [
        {
            title: "Your perfect match!",
            desc: "Play our popular Encounters game and get matched with other users. It’s a great way to break the ice and chat to new people."
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
            var buttons = document.querySelector('.circles-container').children;
            for (var i = 0, len = buttons.length; i < len; ++i) {
                $(buttons[i]).click(function (ev) {
                    changeBtnClass(ev.target.id);
                    document.querySelector('.slider-section h1').innerHTML = descriptions[parseInt(ev.target.id)].title;
                    document.querySelector('.slider-section p').innerHTML = descriptions[parseInt(ev.target.id)].desc;
                });
            }
        }
    }());

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
        //postNewsletterToGoogle();
        $('.send-email-btn').prop('disabled', true);
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
                url: "https://docs.google.com/forms/d/1M1KgYRFy4JeSG7ieHvuqIOJIBfdFXKTvdloLh62R3X4/formResponse",
                data: {"entry.1436677092": email},
                type: "POST",
                dataType: "xml",
                statusCode: {
                    0: function () {
                        $('#email').val("");
                        $('#success-alert').show();
                        $('.send-email-btn').prop('disabled', false);
                        setTimeout(function () {
                            $('#success-alert').hide();
                        }, 4000);
                    },
                    200: function () {
                        $('#email').val("");
                        $('#success-alert').show();
                        $('.send-email-btn').prop('disabled', false);
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