global.SALT_KEY = "f5b99242-6504-4ca3-90f2-05e78e5761ef";
global.EMAIL_TMPL = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Level Up - Boas-Vindas</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
            text-align: center; /* Center-align the content in the body */
        }

        header {
            background-color: #55B500;
            color: #fff;
            padding: 10px;
            text-align: center;
        }

        main {
            max-width: 600px;
            margin: auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center; /* Center-align the content in the main section */
        }

        h1 {
            color: #333;
        }

        .title {
            color : #fff
        }

        p {
            margin-bottom: 20px;
        }

        footer {
            text-align: center;
            padding: 10px;
            background-color: #55B500;
            color: #fff;
        }
    </style>

</head>
<body>
    <header>
        <h1 class='title'>Level Up</h1>
    </header>

    <main>
        <h1>Olá {0}, Bem-Vindo(a) à Level Up!</h1>
        <p>Obrigado por se juntar a nós. Estamos animados em tê-lo(a) como parte da nossa comunidade.</p>
        <p>Fique à vontade para explorar nossa loja e descobrir produtos incríveis.</p>
        <p>Se precisar de alguma ajuda ou tiver alguma dúvida, não hesite em entrar em contato conosco.</p>
        <p>Boas compras!</p>
    </main>

    <footer>
        <p>&copy; 2024 Level Up. Todos os direitos reservados.</p>
    </footer>
</body>
</html>
`;

module.exports = {
    connectionString : "mongodb+srv://root:Master2208@nodestore.ayfnqxx.mongodb.net/nodestore?retryWrites=true&w=majority",
    gmail : 
    {
        user : "node.store.official@gmail.com",
        keypass : "faig oogi kgqc xtar",
    },
    containerConnectionString : "TBD"
};
