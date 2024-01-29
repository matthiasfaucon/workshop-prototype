<template>
    <div>
        <qrcode-reader @onDecode="onDecode" />
    </div>
</template>
  
<script setup>
import QrcodeReader from 'vue-qrcode-reader';

const onDecode = (result) => {
    console.log(result);
    qrCodeResult.value = result; // Utilisez la référence reactive (vue 3) pour stocker le résultat
};

// Si vous souhaitez stocker le résultat dans une variable reactive
import { ref } from 'vue';
const qrCodeResult = ref(null);
</script>
  