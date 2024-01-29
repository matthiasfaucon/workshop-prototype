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
    const artisteData = req.body;
    // Récupérer les données de l'artiste
    console.log(artisteData);

    const artisteString = JSON.stringify(artisteData);

    // Générer le QR code
    const qrCode = await QRCode.toDataURL(artisteString);

    // // Envoyer l'image du QR code en réponse
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
