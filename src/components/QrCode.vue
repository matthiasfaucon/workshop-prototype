<template>
    <div>
        <p>
            Track function:
            <select v-model="selected">
                <option v-for="option in options" :key="option.text" :value="option">
                    {{ option.text }}
                </option>
            </select>
        </p>

        <qrcode-stream :track="selected.value" @result="handleQrCodeResult" @error="logErrors" />
        <div ref="map" style="height: 400px; width: 100%;"></div>

    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { QrcodeStream } from 'vue-qrcode-reader';

const options = [
    { text: 'nothing (default)', value: undefined },
    { text: 'outline', value: paintOutline },
    { text: 'centered text', value: paintCenterText },
    { text: 'bounding box', value: paintBoundingBox }
];

const selected = ref(options[1]);

const mapRef = ref(null);

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

function paintBoundingBox(detectedCodes, ctx) {
    for (const detectedCode of detectedCodes) {
        const {
            boundingBox: { x, y, width, height }
        } = detectedCode

        ctx.lineWidth = 2
        ctx.strokeStyle = '#007bff'
        ctx.strokeRect(x, y, width, height)
    }
}

function paintCenterText(detectedCodes, ctx) {
    for (const detectedCode of detectedCodes) {
        const { boundingBox, rawValue } = detectedCode

        const centerX = boundingBox.x + boundingBox.width / 2
        const centerY = boundingBox.y + boundingBox.height / 2

        const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width)
        console.log(boundingBox.width, ctx.canvas.width)

        ctx.font = `bold ${fontSize}px sans-serif`
        ctx.textAlign = 'center'

        ctx.lineWidth = 3
        ctx.strokeStyle = '#35495e'
        ctx.strokeText(detectedCode.rawValue, centerX, centerY)

        ctx.fillStyle = '#5cb984'
        ctx.fillText(rawValue, centerX, centerY)
    }
}
const logErrors = console.error;

function handleQrCodeResult(result) {
    if (result) {
        // Supposons que le résultat du QR code est une paire de coordonnées [latitude, longitude]
        const [latitude, longitude] = result.split(',');

        // Centrer la carte sur les coordonnées du QR code
        if (mapRef.value) {
            const map = new google.maps.Map(mapRef.value, {
                center: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
                zoom: 15
            });

            // Ajoutez un marqueur à la position
            const marker = new google.maps.Marker({
                position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
                map: map,
                title: 'QR Code Location'
            });
        }
    }
}

</script>