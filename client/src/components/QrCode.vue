<template>
    <div v-if="isDisplay" class="qr-code-display">
        <qrcode-stream :track="selected.value" @result="handleQrCodeResult" @error="logErrors" />
    </div>
    <div v-else>
        <p>Code QR détecté</p>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { QrcodeStream } from 'vue-qrcode-reader';

const selected = ref({ text: 'centered text', value: paintBoundingBoxAndText });
const isDisplay = ref(true);

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

        const fontSize = Math.max(12, (50 * width) / ctx.canvas.width);

        // Ajouter un espace autour du texte
        const textX = centerX;
        const textY = centerY; // Ajustez selon vos besoins

        // Convertir la chaîne JSON en objet
        const artisteInfo = JSON.parse(rawValue);

        // Afficher les informations de l'artiste de manière structurée
        const artisteText = `Artiste: ${artisteInfo.artiste.nom}`;

        const lineHeight = fontSize + 5; // Espace entre les lignes
        const lines = artisteText.split('\n'); // Séparer les lignes par les sauts de ligne

        // Trouver la largeur maximale parmi toutes les lignes
        let maxWidth = 0;
        for (const line of lines) {
            const lineWidth = ctx.measureText(line).width;
            maxWidth = Math.max(maxWidth, lineWidth);
        }

        // Dessiner un rectangle de fond blanc pour le texte avec de la marge
        const padding = 10;
        const textHeight = lines.length * lineHeight + padding * 2;

        ctx.fillStyle = '#fff';
        ctx.fillRect(
            textX - maxWidth / 2 - padding,
            textY - textHeight / 2,
            maxWidth + padding * 2,
            textHeight
        );

        // Utiliser une couleur de texte noire sans contour
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillStyle = '#000';

        // Dessiner chaque ligne de texte
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const lineY = textY + i * lineHeight - (lines.length - 1) * lineHeight / 2;

            // Dessiner chaque ligne de texte
            ctx.fillText(line, textX, lineY);
        }
    }
    isDisplay.value = false;
}

const logErrors = console.error;

</script>

<style>
.qr-code-display {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 4rem;
}

.qr-code-display div {
    height: 35rem !important;
    width: 80% !important;
}
</style>