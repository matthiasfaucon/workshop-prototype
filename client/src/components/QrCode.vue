<template>
    <div v-if="isDisplay" class="qr-code-display">
        <h2>Trouvez le QR Code !</h2>
        <qrcode-stream :track="selected.value" @result="handleQrCodeResult" @error="logErrors" />
        <div class="artist-presentation">

            <h2>Vous recherchez :</h2>
            <div class="artist">
                <img :src="`../src/assets/${list[id - 1].image}`" alt="test" />
                <div class="info-artist">
                    <p class="artist-name">{{ list[id - 1].nom }}</p>
                    <p class="artist-description">{{ list[id - 1].description }}</p>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <Coordonnees @geolocSelected="handleGeolocSelected" :selectedSecondStepGeolocId="selectedSecondStepGeolocId" />
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { QrcodeStream } from 'vue-qrcode-reader';
import Coordonnees from '@/components/Coordonnees.vue';
import { useArtistsList } from '@/stores/useArtistsList';
import axios from 'axios';

const selected = ref({ text: 'centered text', value: paintBoundingBoxAndText });
let { artistesList, selectedSecondStepGeolocId, isVisible } = useArtistsList();

const list = ref(artistesList);

const isDisplay = ref(isVisible);
const id = ref(null);
const currentURL = window.location.href;
const url = new URL(currentURL);
id.value = url.pathname.split('/')[2];

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
        console.log(artisteInfo);

        // Afficher les informations de l'artiste de manière structurée
        let artisteText = `Artiste: ${artisteInfo.artiste.nom}`;

        if (artisteInfo.artiste.second_step_geoloc.length === 1) {
            // Si un QR code a été détecté, arrêter le scan
            isDisplay.value = true;
            if (artisteInfo.artiste.second_step_geoloc[0].is_working === true) {
                // Renvoyer vers l'url dans artisteInfo.artiste.second_step_geoloc[0].url
                window.location.href = artisteInfo.artiste.second_step_geoloc[0].url;
            } else {
                // Renvoyer vers l'url dans artisteInfo.artiste.second_step_geoloc[0].url
                artisteText += `\nCe n'est pas le bon QR code, veuillez scanner un autre QR code`;
            }
        } else {
            // Si plusieurs QR codes ont été détectés, continuer le scan
            isDisplay.value = false;
        }


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
}

async function handleGeolocSelected(selectedId) {
    // Update isVisible and perform other necessary actions
    isDisplay.value = true;
    console.log('Selected Geoloc ID in QrCode.vue:', selectedId);
    const response = await axios.post(`http://localhost:5000/generate-qrcode`, {
        artiste: artistesList[id.value - 1],
        second_qr_code_id: selectedId,
    });
    console.log(response.data); // Les données retournées par le serveur
}

const logErrors = console.error;

</script>

<style>
.qr-code-display {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 4rem;
}

.qr-code-display h2 {
    font-size: 1.8rem;
    font-weight: 700;
    color: white;
}

.qr-code-display div:first-of-type {
    height: 30rem !important;
    width: 70% !important;
}

.artist {
    display: flex;
    justify-content: flex-start;
    margin-top: 2rem;
    gap: 1rem;
    width: 80%;
    height: auto;
}

.info-artist {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
}

.info-artist .artist-name {
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
}

.info-artist .artist-description {
    font-size: 1.2rem;
    font-family: 'Futura Bk BT';
    font-weight: 200;
    color: white;
}

.info-artist p {
    margin: 0;
}

.artist img {
    height: fit-content;
}

.artist-presentation {
    width: 70%;
}

@media screen and (max-width: 560px) {
    .artist {
        flex-direction: column;
    }

}
</style>
