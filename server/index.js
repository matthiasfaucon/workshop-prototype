const express = require('express');
const cors = require('cors');
const QRCode = require('qrcode');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
// Endpoint pour générer un QR code
app.post('/generate-qrcode', async (req, res) => {
  try {
    // Récupérer le body de la requête
    const data = req.body;
    // Récupérer les données de l'artiste

    console.log(data);

    if (data.second_qr_code_id !== null){
      // Supprimer dans l'ojet data, dans second_step_geoloc, l'objet qui n'a pas l'id second_qr_code_id
      data.artiste.second_step_geoloc = data?.artiste?.second_step_geoloc?.filter((item) => item.id === data.second_qr_code_id);
      console.log(data);
    }

    const artisteString = JSON.stringify(data);

    console.log(artisteString);

    // Générer le QR code
    const qrCode = await QRCode.toDataURL(artisteString);

    // Save QR code in a file
    const qrCodeImage = await QRCode.toFile('./qr-code.png', artisteString);

    // Envoyer l'image du QR code en réponse
    res.send(`<img src="${qrCode}" alt="QR Code" />`);
  } catch (error) {
    console.error('Erreur lors de la génération du QR code:', error);
    res.status(500).send('Erreur lors de la génération du QR code');
  }
});


// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur écoutant sur le port ${port}`);
});
