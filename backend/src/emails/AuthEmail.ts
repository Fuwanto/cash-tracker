import { transport } from "../config/nodemailer"

type EmailType = {
  name: string
  email: string
  token: string
}

export class AuthEmail {
  static sendConfirmationEmail = async (user: EmailType) => {
    const email = await transport.sendMail({
      from: "CashTracker <admin@demomailtrap.co>",
      to: user.email,
      subject: "CashTracker - Confirma tu cuenta",
      html: `
        <p> Hola: ${user.name}, has creado tu cuenta en CashTracker, ya está casi lista</p>
        <p> Visita el siguiente enlace: </p>
        <a href="#"> Confirmar cuenta </p>
        <p> e ingresa el código: <b>${user.token}</b> </p>
      `,
    })
    console.log("email enviado", email.messageId)
  }
}
