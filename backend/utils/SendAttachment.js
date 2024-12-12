async function SendAttachment(to, subject, body, attachment) {
    try {
        const transport = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: "587",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        const message = {
            from: process.env.EMAIL_USERNAME,
            to,
            subject,
            text: body,
            attachments: [
                {
                    filename: attachment.originalname,
                    content: attachment.buffer,
                },
            ],
        };

        await transport.sendMail(message);

        console.log("Email sent successfully.");
    } catch (error) {
        console.error(error);

        // You can provide more detailed information to the user based on the error
        if (error.code === "ECONNREFUSED") {
            throw new Error("Could not connect to email server. Please try again later.");
        } else {
            throw new Error("An error occurred while sending the email. Please try again later.");
        }
    }
}
