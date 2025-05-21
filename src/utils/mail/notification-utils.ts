import { MAIL_USER, MAIL_PASS } from "../../config";
import MailTemplates from "./templates-mails-utils"; 
import nodemailer, { Transporter } from "nodemailer";

export abstract class Mailer {
    protected transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: MAIL_USER,
                pass: MAIL_PASS
            }
        });
    }

    protected abstract getMailOptions(...args: any[]): { to: string; subject: string; html: string };

    public async send(...args: any[]): Promise<void> {
        const mailOptions = this.getMailOptions(...args);
        await this.transporter.sendMail({
            from: MAIL_USER,
            ...mailOptions
        });
    }
}

export class NewCustomerEmail extends Mailer {
    public getMailOptions(to: string, customerName: string): { to: string; subject: string; html: string } {
        return {
            to,
            subject: "Bem-vindo!",
            html: MailTemplates.welcome({
                name: customerName
            })
        };
    }
}

export class NotificationStatusOrder extends Mailer {
    public getMailOptions(to: string, orderId: string, status: string): { to: string; subject: string; html: string } {
        return {
            to,
            subject: `Status do Pedido #${orderId}`,
            html: MailTemplates.updateStatusProduct({
                name: "Cliente",
                pedidoId: orderId,
                status,
                observacao: "Seu pedido foi atualizado com sucesso."
            })
        };
    }
}

export class ConfirmationPurchase extends Mailer {
    public getMailOptions(to: string, purchaseId: string): { to: string; subject: string; html: string } {
        return {
            to,
            subject: "Confirmação de Compra",
            html: MailTemplates.purchaseApproved({
                name: "Cliente",
                valor: "100.00",
                produtos: [
                    { title: "Produto 1", quantity: 1, price: 50 },
                    { title: "Produto 2", quantity: 2, price: 25 }
                ] as { title: string; quantity: number; price: number }[]
            } as any)
        };
    }
}