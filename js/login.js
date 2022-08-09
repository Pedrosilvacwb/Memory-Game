const usuarioInput = document.querySelector('.login__input');
const btnLogin = document.querySelector('.login__button');
const form = document.querySelector('.login__form');

/* VALIDANDO O INPUT DO USUARIO */
const validateInput = (event) => {

    if(usuarioInput.value.length >= 3){
        btnLogin.removeAttribute('disabled');
        return
    }

    btnLogin.setAttribute('disabled', '')

}

usuarioInput.addEventListener('input', validateInput);

/* FUNÇÃO PARA SUBMETER O FORMULÁRIO */
const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem('player', usuarioInput.value);
    window.location = 'pages/game.html';
    
}
form.addEventListener('submit', handleSubmit);

