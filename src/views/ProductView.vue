<template>
  <div>

    <!-- <Map></Map> -->
    <QrCode />
  </div>
</template>

<script setup>
import Map from '@/components/Map.vue';
import QrCode from '@/components/QrCode.vue';
import { ref, onMounted } from 'vue';

const props = defineProps(['id'])
const id = ref(null);

onMounted(() => {
  id.value = props.id;
})

console.log(id);

</script>