export function emailTemplateSelection(name: string, status: string): string {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Hasil Seleksi</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
        padding: 0;
        margin: 0;
        text-align: center;
      }

      table {
        width: 100%;
        background-color: #fff;
      }

      .container {
        max-width: 650px;
        margin: auto;
        background-color: #f0f0f0;
        padding: 30px;
        border-radius: 4px;
      }

      .logo {
        width: 100%;
        padding: 20px;
        background-color: #08690c;
      }

      h1 {
        font-family: "Nunito Sans", Arial, Verdana, Helvetica, sans-serif;
        font-size: 28px;
        font-weight: 300;
        color: #666;
        margin: 0;
        padding-bottom: 1em;
        text-align: left;
      }

      p {
        font-family: "Nunito Sans", Arial, Verdana, Helvetica, sans-serif;
        font-size: 18px;
        color: #666;
        margin: 0;
        line-height: 24px;
        text-align: left;
        padding-bottom: 3%;
      }

      .footer {
        background-color: #f0f0f0;
        padding: 20px 40px;
        text-align: center;
      }

      .footer p {
        font-family: "Nunito Sans", Arial, Verdana, Helvetica, sans-serif;
        font-size: 12px;
        color: #777;
        margin: 0;
        line-height: 24px;
      }

      .footer a {
        color: #777;
        text-decoration: none;
      }
      .btn {
        appearance: button;
        backface-visibility: hidden;
        background-color: #f8bf02;
        border-radius: 6px;
        border-width: 0;
        box-sizing: border-box;
        color: #fff;
        cursor: pointer;
        font-size: 100%;
        height: 44px;
        line-height: 1.15;
        margin: 12px 0 0;
        outline: none;
        overflow: hidden;
        padding: 0 25px;
        position: relative;
        text-align: center;
        text-transform: none;
        transform: translateZ(0);
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        width: 50%;
      }
    </style>
  </head>
  <body>
    <table align="center" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#f0f0f0">
      <tr>
        <td style="padding: 30px 30px 20px 30px">
          <table
            cellpadding="0"
            cellspacing="0"
            border="0"
            width="100%"
            bgcolor="#ffffff"
            style="max-width: 650px; margin: auto"
          >
            <tr>
              <td colspan="2" align="center" class="logo">
                <a href="https://uninus.ac.id" target="_blank"
                  ><img
                    src="https://i0.wp.com/uninus.ac.id/wp-content/uploads/2023/09/Neo-Uninus.png?resize=300"
                    border="0"
                    style="width: 180px"
                /></a>
              </td>
            </tr>
            <tr>
              <td colspan="2" align="center" style="padding: 50px 50px 0px 50px">
                <h1 style="color: #242323">Hai ${name}</h1>
              </td>
            </tr>
            <tr>
              <td style="text-align: left; padding: 0px 50px" valign="top">
                <p style="color: #1f1f1f">${
                  !status.includes("Tidak")
                    ? `Selamat Kamu berhasil lulus penerimaan mahasisa baru. Tinggal satu langkah lagi kamu akan menjasi mahasiswa di UNINUS. Klik tombol di bawah ini untuk melihat detail hasil seleksi.`
                    : `Maaf kamu tidak lulus penerimaan mahasisa baru. Terima kasih telah berpartisipasi, Tetap semangat ya!`
                },</p>
                ${
                  !status?.includes("Tidak")
                    ? `<div style="width: 100%; display: flex; justify-content: center">
                <button class="btn" role="button">
                  <a
                    style="text-decoration: none; font-weight: bold; color: #f7f7f7"
                    href="https://pmb.dev.uninus.ac.id/"
                    target="_blank"
                    data-saferedirecturl="https://www.google.com/url?q=https://pmb.dev.uninus.ac.id/"
                    >Lihat Detail Hasil Seleksi</a
                  >
                </button>
              </div>`
                    : ``
                }
              </td>
            </tr>
            <tr>
              <td style="text-align: left; padding: 30px 50px 50px 50px" valign="top">
                <p>
                  Jika Kamu mempunyai pertanyaan atau mengalami kendala, hubungi
                  adminpmb@uninus.ac.id
                </p>
              </td>
            </tr>
            <tr>
              <td colspan="2" align="center" class="footer">
                <p>
                  <a href="https://uninus.ac.id" target="_blank">UNIVERSITAS ISLAM NUSANTARA</a>
                  <br />
                  Jl. Soekarno Hatta No.530, Sekejati, Kec. Buahbatu, Kota Bandung, Jawa Barat 40286
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
      `;
}
