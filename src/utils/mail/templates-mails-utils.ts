type TemplateData = { [key: string]: string | number };

class MailTemplates {
    static msg: string = '';
    static template: string = `
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
        text-align: center;
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
        text-align: center;
        }
        h1 {
        color: #333;
        }
        .title {
        color: #fff
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
        <h1 class='title'>Level Up WorkShop</h1>
    </header>
    <main>
         {{MSG}}
    </main>
    <footer>
        <p>&copy; 2024 Level Up. Todos os direitos reservados.</p>
    </footer>
    </body>
    </html>
    `;

    private static render(msg: string) {
        this.msg = msg;
        return this.template.replace('{{MSG}}', msg);
    }

    static welcome(data: TemplateData) {
        const msg = `
            <h1>Bem-vindo(a)!</h1>
            <p>Olá, ${data.name}! Seja bem-vindo(a) ao Level Up.</p>
        `;
        return this.render(msg);
    }

    static resetPassword(data: TemplateData) {
        const msg = `
            <h1>Redefinição de Senha</h1>
            <p>Olá, ${data.name}. Clique no link abaixo para redefinir sua senha:</p>
            <a href="${data.resetLink}">Redefinir Senha</a>
        `;
        return this.render(msg);
    }

    static notification(data: TemplateData) {
        const msg = `
            <h1>Notificação</h1>
            <p>${data.message}</p>
        `;
        return this.render(msg);
    }

    static purchaseApproved(data: TemplateData & { produtos: { title: string; quantity: number; price: number }[] }) {
        const msg = `
            <h1>Compra Aprovada!</h1>
            <p>Olá, ${data.name}. Sua compra no valor de R$${data.valor} foi aprovada com sucesso.</p>
            <p>Produtos:</p>
            <ul>
                ${data.produtos.map((produto) => `
                    <li>
                        - Produto: ${produto.title}<br>
                        - Quantidade: ${produto.quantity}<br>
                        - Valor R$ ${produto.price}
                    </li>
                `).join('')}
            </ul>    
            <p>Em breve você receberá mais informações sobre a entrega.</p>
        `;
        return this.render(msg);
    }

    static updateStatusProduct(data: TemplateData) {
        const msg = `
            <h1>Atualização do Status do seu pedido</h1>
            <p>Olá, ${data.name}. O status do seu pedido #${data.pedidoId} foi atualizado para: <strong>${data.status}</strong>.</p>
            <p>${data.observacao || ''}</p>
        `;
        return this.render(msg);
    }
}

export default MailTemplates;