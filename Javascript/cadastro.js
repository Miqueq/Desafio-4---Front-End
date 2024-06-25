document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById("formularia_cadastro");
    const jwtToken = "9b2e7a97f5b9a5d1c7e3f9a2e5d4f8b3c1a7e9d6f4b2c8e1d7a6c3b9e5f1a4c7";
    const api = "https://memorias-ma-api-production.up.railway.app/api/auth/register";

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        let name = document.getElementById('name').value;
        let username = document.getElementById('username').value;
        let birthdate = document.getElementById('birthdate').value;
        let email = document.getElementById('email').value;
        let city = document.getElementById('city').value;
        let state = document.getElementById('state').value;
        let password = document.getElementById('password').value;
        let confirmPassword = document.getElementById('confirmPassword').value;

        let formCad = {
            name: name,
            username: username,
            birthdate: birthdate,
            email: email,
            city: city,
            state: state,
            password: password,
            confirmPassword: confirmPassword
        };

        console.log('Form data as object:', formCad);
        // Se as senhas coincidirem, fazer requisição de cadastro para API
        if (password === confirmPassword) {
            fetch(api, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwtToken}`
                },
                body: JSON.stringify(formCad)
            })
                .then(response =>{
                    if (!response.ok) {}
                    return response.json();
                })
                .then(data => {
                    if(data['message'] === "Password does not meet criteria"){
                        alert('A Senha não atende os critérios; não pode conter o nome ou partes do nome de login; - Obedecer os requisitos: (mínimo 8 caracteres ) 1- letras maiúsculas (A-Z); 2- letras minúsculas (a-z); 3- números; 4- caracteres especiais).')
                    }if (data['message'] === "User already exists") {
                        alert('O Usuário já está cadastrado');
                    }
                    else {
                        console.log("Sucesso:", data);
                        alert("Cadastro realizado com sucesso!");
                    }
                })
                .catch(erro => {
                    console.error('Erro:', erro);
                    alert('Não obtivemos resposta');
                });
        }else {
            alert('as senhas não coincidem')
        }
    })
})