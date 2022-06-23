const { Router } = require("express");
const nodemailer = require("nodemailer");
const router = Router();
const emailriegoGmail = "riego.sae@gmail.com";
const handlebars = require("nodemailer-express-handlebars");
const path = require("path");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const accountTransport = require("./accountTransport.json");
const accountMail = require("./accountMail.json");


async function authMailClient() {
  try {
    const oauth2client = new OAuth2(
      accountTransport.auth.clientId,
      accountTransport.auth.clientSecret,
      "https://developers.google.com/oauthplayground"
    );

    oauth2client.setCredentials({
      refresh_token: accountTransport.auth.refreshToken,
      tls: {
        rejectUnauthorized: false,
      },
    });
    const token = await oauth2client.getAccessToken();
    accountTransport.auth.accessToken = token;

    //creo el transporte
    let transporterC = nodemailer.createTransport(oauth2client);

    return transporterC;
  } catch (err) {
    console.log(err);
  }
}

router.post("/sendEmail", async (req, res) => {
  console.log(req.body);
  const { nombreContacto, emailContacto, checkAsunto, consulContacto } =
    req.body;
  
    //manejo de asunto vacio
    if (checkAsunto == undefined)
        checkAsunto= "Sin Area de Interes";
  
  if (nombreContacto !== "" && emailContacto !== "" && consulContacto !== "") {
    ContentHTML = `<h1> Datos de Correo</h1>
        <ul>
        <li>${nombreContacto}</li>
        <li>${emailContacto}</li>
        <li>${checkAsunto}</li>
        <p>${consulContacto}</p>
        </ul>
    `;
    //Objeto de envio Equipo
    let mensajeEquipo = {
      from: `Desde WEB SAE Riego - CONSULTA ${accountMail.auth.user}`,
      to: emailriegoGmail,
      subject: `${checkAsunto}`,
      html: `<h1>Consulta de ${nombreContacto},</h1> 
              <h2>Correo: ${emailContacto}</h2>\n\n\n
              <h4>Consulta: ${consulContacto}</h4>`,
              
    };

    //Objeto de envio Cliente
    let mensajeCliente = {
      from: `SAE Riego ${accountMail.auth.user}`,
      to: `${emailContacto}`,
      subject: `Consulta exitosa`,
      template: "undefined",
      context: {
        usercontact: `${nombreContacto}`,
      },
    };

    //creo el transportador de NODEMAILER para configurar puerto SMTP y dominio
    const transporterC = nodemailer.createTransport(accountMail);

    //creo el transportador de NODEMAILER para configurar puerto SMTP y dominio
    const transporterE = nodemailer.createTransport(accountMail);

    transporterC.use(
      "compile",
      handlebars({
        viewEngine: {
          extname: ".handlebars",
          partialsDir: path.resolve("./assets/template"),
          defaultLayout: false,
        },
        viewPath: path.resolve("./assets/template"),
        extname: ".handlebars",
      })
    );
    transporterC.sendMail(mensajeCliente, function (error, info) {
      if (error) {
        console.log(error);
        res.status(404).send("Hubieron Problemas");
      } else {
        transporterE.sendMail(mensajeEquipo, function (error, info) {
          if (error) {
            console.log(error);
            res.status(404).send("Hubieron Problemas");
          } else {
            res.send({
              status: "success",
              data: "Mail enviado al equipo",
            });
            console.log("Mensaje enviado Al Equipo", info.messageId);
          }
          transporterE.close();
        });
        console.log("Mensaje enviado Al cliente", info.messageId);
        res.status(200);
      }
    }); /*
    transporterE.sendMail(mensajeEquipo, function (error) {
      if (error) {
        console.log(error);
      } else {
        res.send({
          status: "success",
          data: "Mail enviado al equipo",
        });
        console.log("Mensaje enviado Al Equipo");
      }
      transporterE.close();
    });

    console.log("Mensaje enviado Al cliente");
    authMailClient()
      .then((result) =>
        result.use(
          "compile",
          handlebars({
            viewEngine: {
              extname: ".handlebars",
              partialsDir: path.resolve("./assets/template"),
              defaultLayout: false,
            },
            viewPath: path.resolve("./assets/template"),
            extname: ".handlebars",
          })
        )
      )
      .then((result) => result.sendMail(mensajeCliente))
      .then((result) => result.send("Mensaje Enviado al cliente"))
      .catch((err) => console.log(err.message));
        */
  } else res.send("<h1>ERROR EN EL ENVIO CAMPOS VACIOS</h1>");
});
module.exports = router;
