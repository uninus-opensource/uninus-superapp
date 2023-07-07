export function getEmailMessageTemplate(name: string,otp: string, obj: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Verifikasi OTP</title>
          <style>
            /* Gaya CSS untuk email */
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
              text-align: center;
            }
        
            .container {
              background-color: #ffffff;
              max-width: 500px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #dddddd;
              border-radius: 4px;
            }
        
            h2 {
              color: #333333;
              margin-bottom: 20px;
            }
        
            p {
              color: #666666;
              margin-bottom: 20px;
            }
        
            .otp-code {
              background-color: #f6f6f6;
              padding: 10px;
              border-radius: 4px;
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <p>Halo ${name},</p>
            <p>Kode OTP Anda adalah:</p>
            <div class="otp-code">${otp}</div>
            <p>Silakan gunakan kode ini untuk ${obj}.</p>
          </div>
        </body>
      </html>
    `;
}
 