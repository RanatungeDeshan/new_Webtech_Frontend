<template>
  <div class="patient">
    <h1>Here you can see all registered patients</h1>
    <!-- Tabelle mit Patientendaten -->
    <table>
      <!-- Tabellenkopf mit Spaltenüberschriften -->
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Geburtsdatum</th>
          <th>TelNum</th>
          <th>Health Condition</th>
          <th>Appointments</th>
        </tr>
      </thead>
      <!-- Tabellenkörper mit Patientendaten -->
      <tbody>
        <!-- v-for Direktive, um über jedes Patientenobjekt zu iterieren -->
        <tr v-for="patient in patients" :key="patient.id">
          <!-- <td> Elemente, um die entsprechenden Felder auszugeben -->
          <td>{{ patient.id }}</td>
          <td>{{ patient.name }}</td>
          <td>{{ convertToString(patient.birthdate) }}</td>
          <td>{{ patient.telNum }}</td>
          <td>{{ patient.healthCondition }}</td>
          <td>{{ convertToString(patient.appointment) }}</td>
        </tr>
      </tbody>
    </table>
    <button type="button" @click="router.push('/edit');">Edit</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import moment from 'moment'
import { useRouter } from 'vue-router';

const router = useRouter();

type Patient = { 
  id?: number; 
  name: string; 
  birthdate: Date; 
  telNum: number;
  healthCondition: string;
  appointment: Date
 }

const patients = ref<Patient[]>([])

onMounted(() => {
  loadPatients()
})

function convertToString(date: Date): string {
  // Verwenden Sie moment.js
  return moment(date).format('DD.MM.YYYY')
}

function loadPatients() {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  const endpoint = `${baseUrl}/patients/`
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow'
  }
  fetch(endpoint, requestOptions)
    .then((response) => response.json())
    .then((result) => (patients.value = result))
    .catch((error) => console.log('error', error))
}


</script>

<style>
/* Hintergrundfarbe für den gesamten Container */
div {
  background-color: #f0f0f0;
}

/* Überschrift zentrieren und Farbe ändern */
h1 {
  text-align: center;
  color: #333;
}

/* Tabelle mit Abstand, Rahmen und alternierenden Zeilenfarben */
table {
  margin: 1rem auto;
  border-collapse: collapse;
  width: 100%;
}

button {
  font-size: large;
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: #0099ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

th,
td {
  padding: 0.5rem;
  border: 1px solid #ccc;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #eee;
}

/* Media Query für kleinere Bildschirme */
@media (max-width: 768px) {
  /* Tabelle mit voller Breite */
  table {
    width: 100%;
  }
}
</style>
