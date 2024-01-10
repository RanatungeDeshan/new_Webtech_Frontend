<template>
  <main>
    <!-- Hier wird die patientId als dynamischer Teil der Route übergeben -->
    <DynamicForm title="Here you can edit the information of the patients" :patientId="patientId" />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DynamicForm from '../components/Edit.vue';
import { useRoute } from 'vue-router';

const patientId = ref<number | null>(null);

onMounted(() => {
  // Extrahiere die Patienten-ID aus der aktuellen Route
  const route = useRoute();
  console.log(route.params)
  const idParam = route.params.id;

  if (idParam && typeof idParam === 'string') {
    // Versuche, die ID in eine Zahl zu konvertieren
    patientId.value = parseInt(idParam, 10);
    console.log(patientId.value)

    if (isNaN(patientId.value)) {
      console.error('Invalid patient ID in route parameters:', idParam);
      patientId.value = null;
    }
  } else {
    // Behandeln Sie den Fall, in dem id ein string[] ist oder nicht definiert
    console.error('Invalid patient ID in route parameters:', idParam);
  }
});
</script>


<style scoped></style>