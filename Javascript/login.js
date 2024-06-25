document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById('forms-login');

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();
        const jwtToken = "9b2e7a97f5b9a5d1c7e3f9a2e5d4f8b3c1a7e9d6f4b2c8e1d7a6c3b9e5f1a4c7";
        const formLogin = new FormData(formulario);
        const dataLogin = Object.fromEntries(formLogin.entries());

        const api = "https://memorias-ma-api-production.up.railway.app/api/auth/login";

        fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`
            },
            body: JSON.stringify(dataLogin)
        })
            .then(response =>{
                if (!response.ok) {}
                return response.json();
            })
            .then(data => {
                if (data['message'] === "Invalid email or password") {
                    alert('Email ou senha inválidos');
                }
                else {
                    alert("Login bem-sucedido");
                }
            })
            .catch(erro => {
                console.error('Erro:', erro);
                alert('Não obtivemos resposta');
            });
    })
});