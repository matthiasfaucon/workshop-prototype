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

        const fontSize = Math.max(12, (50 * width) / ctx.canvas.width);

        // Ajouter un espace autour du texte
        const textX = centerX;
        const textY = centerY; // Ajustez selon vos besoins

        // Dessiner un rectangle de fond blanc pour le texte avec de la marge
        const padding = 10;
        const textWidth = ctx.measureText(rawValue).width;
        const textHeight = fontSize + padding * 2;

        ctx.fillStyle = '#fff';
        ctx.fillRect(
            textX - textWidth / 2 - padding,
            textY - textHeight / 2,
            textWidth + padding * 2,
            textHeight
        );

        // Utiliser une couleur de texte noire sans contour
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillStyle = '#000';

        // Dessiner le texte
        ctx.fillText(rawValue, textX, textY);
    }
}

const logErrors = console.error;

</script>