const express = require('express');
const cors = require('cors');
const QRCode = require('qrcode');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/generate-qrcode', async (req, res) => {
  try {
    const artisteData = req.body;
    
    // Sérialiser manuellement les objets imbriqués
    artisteData.artiste.first_step_geoloc = { ...artisteData.artiste.first_step_geoloc };
    artisteData.artiste.second_step_geoloc = artisteData.artiste.second_step_geoloc.map(loc => ({ ...loc }));

    console.log(artisteData.artiste);
    const artisteString = JSON.stringify(artisteData);


    const qrCode = await QRCode.toDataURL(artisteString);

    res.send(`<img src="${qrCode}" alt="QR Code" />`);
  } catch (error) {
    console.error('Erreur lors de la génération du QR code:', error);
    res.status(500).send('Erreur lors de la génération du QR code');
  }
});

app.listen(port, () => {
  console.log(`Serveur écoutant sur le port ${port}`);
});
