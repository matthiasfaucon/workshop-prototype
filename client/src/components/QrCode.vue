<template>
    <div>
        <qrcode-stream :track="selected.value" @result="handleQrCodeResult" @error="logErrors" />
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { QrcodeStream } from 'vue-qrcode-reader';

const selected = ref({ text: 'centered text', value: paintBoundingBoxAndText });

function paintOutline(detectedCodes, ctx) {
    console.log(detectedCodes)

    for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

        ctx.strokeStyle = 'red'

        ctx.beginPath()
        ctx.moveTo(firstPoint.x, firstPoint.y)
        for (const { x, y } of otherPoints) {
            ctx.lineTo(x, y)
        }
        ctx.lineTo(firstPoint.x, firstPoint.y)
        ctx.closePath()
        ctx.stroke()
    }
}

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

        // Utiliser une couleur de fond pour le texte
        ctx.fillStyle = '#fff';

        // Ajouter un espace autour du texte
        const textX = centerX;
        const textY = centerY; // Ajustez selon vos besoins

        // Dessiner un rectangle de fond pour le texte
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textAlign = 'center';

        const lineHeight = fontSize + 5; // Espace entre les lignes
        const lines = rawValue.split('\n'); // Séparer les lignes par les sauts de ligne

        // Dessiner chaque ligne de texte
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const lineY = textY + i * lineHeight - (lines.length - 1) * lineHeight / 2;

            const textWidth = ctx.measureText(line).width;

            // Dessiner un rectangle de fond pour chaque ligne de texte
            ctx.fillRect(textX - textWidth / 2 - 5, lineY - fontSize / 2 - 5, textWidth + 10, fontSize + 10);

            // Utiliser des couleurs distinctes pour le contour et le texte
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#35495e';
            ctx.fillStyle = '#5cb984';

            // Dessiner chaque ligne de texte
            ctx.strokeText(line, textX, lineY);
            ctx.fillText(line, textX, lineY);
        }
    }
}

const logErrors = console.error;

</script>