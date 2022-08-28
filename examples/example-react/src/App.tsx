import { createStaticPix, hasError } from "pix-utils";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [brCode, setBRCode] = useState("");
  const [qrCode, setQRCode] = useState("");

  useEffect(() => {
    const pix = createStaticPix({
      merchantName: "Thales Ogliari",
      merchantCity: "Sao Miguel do",
      pixKey: "nubank@thalesog.com",
      infoAdicional: "Gerado por Pix-Utils",
      transactionAmount: 1,
      txid: "",
    });

    if (!hasError(pix)) {
      setBRCode(pix.toBRCode());
      pix.toImage().then((img) => {
        setQRCode(img);
      });
    }
  }, []);

  return (
    <div className="App">
      <div>
        <a href="https://github.com/thalesog/pix-utils" target="_blank">
          <img src="/logo-pix.png" className="logo" alt="Pix logo" />
        </a>
      </div>
      <h1>Pix Utils</h1>
      <div className="card">
        <p>Generated BRCode:</p>
        <code>{brCode}</code>

        <p>Generated QRCode:</p>
        <img src={qrCode} width={300} height={300} />
      </div>
    </div>
  );
}

export default App;
