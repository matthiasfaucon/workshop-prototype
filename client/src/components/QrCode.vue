<template>
    <div>
        <qrcode-stream :track="selected.value" @result="handleQrCodeResult" @error="logErrors" />
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { QrcodeStream } from 'vue-qrcode-reader';

const selected = ref({ text: 'centered text', value: paintBoundingBoxAndText });

function paintBoundingBoxAndText(detectedCodes, ctx) {
    for (const detectedCode of detectedCodes) {
        const { boundingBox, rawValue } = detectedCode;

        // Dessiner la bounding box
        const { x, y, width, height } = boundingBox;
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#007bff';
        ctx.strokeRect(x, y, width, height);

        // Dessiner le texte centré avec fond
        const centerX = x + width / 2;
        const centerY = y + height / 2;

        const fontSize = Math.max(10, (50 * width) / ctx.canvas.width);

        // Utiliser une couleur de fond pour le texte
        ctx.fillStyle = '#fff';

        // Ajouter un espace autour du texte
        const textX = centerX;
        const textY = centerY; // Ajustez selon vos besoins

        // Dessiner un rectangle de fond pour le texte
        ctx.font = `bold ${fontSize}px nunito`;
        ctx.textAlign = 'center';

        // Convertir la chaîne JSON en objet
        const artisteInfo = JSON.parse(rawValue);

        // Afficher les informations de l'artiste de manière structurée
        const artisteText = `Artiste: ${artisteInfo.artiste.nom}\nDescription: ${artisteInfo.artiste.description}\nImage: ${artisteInfo.artiste.image}\n`;

        for (const geoloc of artisteInfo.second_step_geoloc) {
            artisteText += `\n\nAdresse: ${geoloc.adresse}\nLatitude: ${geoloc.latitude}\nLongitude: ${geoloc.longitude}\n`;
        }

        console.log(artisteText);

        const lineHeight = fontSize + 5; // Espace entre les lignes
        const lines = artisteText.split('\n'); // Séparer les lignes par les sauts de ligne

        // Dessiner chaque ligne de texte
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const lineY = textY + i * lineHeight - (lines.length - 1) * lineHeight / 2;

            const textWidth = ctx.measureText(line).width;

            // Dessiner un rectangle de fond pour chaque ligne de texte
            ctx.fillRect(textX - textWidth / 2 - 5, lineY - fontSize / 2 - 5, textWidth + 10, fontSize + 10);

            // Utiliser des couleurs distinctes pour le contour et le texte
            ctx.lineWidth = 5;
            // ctx.strokeStyle = '#35495e';
            ctx.fillStyle = '#5cb984';

            // Dessiner chaque ligne de texte
            ctx.strokeText(line, textX, lineY);
            ctx.fillText(line, textX, lineY);
        }
    }
}


const logErrors = console.error;

</script>