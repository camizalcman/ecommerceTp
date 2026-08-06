import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendOrderConfirmationEmail({ to, orderNumber, items, total, contactInfo }) {
  const itemsList = items
    .map((item) => `- ${item.name} x${item.quantity}: $${item.subtotal}`)
    .join("\n");

  //Email para el usuario
  const userMsg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: `¡Tu pedido #${orderNumber} fue recibido!`,
    text: `
Hola ${contactInfo.name}!

Tu pedido fue recibido correctamente y ya está en preparación.

Número de orden: #${orderNumber}

Productos:
${itemsList}

Total: $${total}

Dirección de entrega: ${contactInfo.address}

¡Gracias por tu compra!
    `,
    html: `
<h2>¡Hola ${contactInfo.name}!</h2>
<p>Tu pedido fue recibido correctamente y ya está en preparación</p>
<h3>Número de orden: #${orderNumber}</h3>
<ul>
  ${items.map((item) => `<li>${item.name} x${item.quantity}: $${item.subtotal}</li>`).join("")}
</ul>
<p><strong>Total: $${total}</strong></p>
<p>Dirección de entrega: ${contactInfo.address}</p>
<p>¡Gracias por tu compra!</p>
    `,
  };

  //Email al admin
  const adminMsg = {
    to: process.env.SENDGRID_OWNER_EMAIL,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: `Nueva orden recibida #${orderNumber}`,
    text: `
¡Nueva orden recibida!

Número de orden: #${orderNumber}
Cliente: ${contactInfo.name} (${to})
Dirección: ${contactInfo.address}
Teléfono: ${contactInfo.phone}

Productos:
${itemsList}

Total: $${total}
    `,
    html: `
<h2>Nueva orden recibida</h2>
<p><strong>Número de orden:</strong> #${orderNumber}</p>
<p><strong>Cliente:</strong> ${contactInfo.name} (${to})</p>
<p><strong>Dirección:</strong> ${contactInfo.address}</p>
<p><strong>Teléfono:</strong> ${contactInfo.phone}</p>
<ul>
  ${items.map((item) => `<li>${item.name} x${item.quantity}: $${item.subtotal}</li>`).join("")}
</ul>
<p><strong>Total: $${total}</strong></p>
    `,
  };

  await sgMail.send(userMsg);
  await sgMail.send(adminMsg);
}