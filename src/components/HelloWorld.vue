<template>
  <div>
    <h3>{{ title }}</h3>
    <div class="form-container">
      <input v-model="nameField" placeholder="Name" type="text">
      <input v-model="birthField" placeholder="Geburtsdatum" type="date">
      <input v-model="telNumField" placeholder="TelNum" type="number">
      <button type="button" @click="save">Speichern</button>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Geburtsdatum</th>
            <th>TelNum</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="patient in patients" :key="patient.id">
            <td>{{ patient.name }}</td>
            <td>{{ formatDate(patient.birthdate) }}</td>
            <td>{{ patient.telNum }}</td>
          </tr>
          <tr>
            <td>{{ nameField }}</td>
            <td>{{ birthField }}</td>
            <td>{{ telNumField }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

defineProps<{
  title: string;
}>()

type Patient = { id?: number; name: string; birthdate: Date; telNum: number };

const patients = ref<Patient[]>([]);
const nameField = ref('');
const birthField = ref('');
const telNumField = ref(0);


function convertToDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function formatDate(date: Date): string {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return date.toLocaleDateString('de-DE');
}

function loadPatients() {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
  const endpoint = `${baseUrl}/patients/`;
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
  };
  fetch(endpoint, requestOptions)
    .then((response) => response.json())
    .then((result) => result.forEach((patient: Patient) => patients.value.push(patient)))
    .catch((error) => console.log('error', error));
}

function save() {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
  const endpoint = `${baseUrl}/patients`;
  const data: Patient = {
    name: nameField.value,
    birthdate: convertToDate(birthField.value),
    telNum: telNumField.value,
  };
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  fetch(endpoint, requestOptions)
    .then((response) => response.json())
    .then((responseData) => {
      console.log('Success:', responseData);
      patients.value.push(responseData);
      
    })
    .catch((error) => {
      console.log('error', error);
      
    });
}

onMounted(() => {
  loadPatients();
});
</script>

<style scoped>
/* Hintergrundfarbe für den gesamten Container */
div {
  background-color: #f0f0f0;
}

/* Überschrift zentrieren und Farbe ändern */
h3 {
  text-align: center;
  color: #333;
}

/* Formular-Container mit Abstand und Rahmen */
.form-container {
  max-width: 400px;
  margin: 1rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Eingabefelder mit etwas Abstand und Schatten */
input {
  margin: 0.5rem;
  padding: 0.5rem;
  box-shadow: inset 0 0 5px #ddd;
}

/* Speichern-Button mit Farbe und Hover-Effekt */
button {
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: #0099ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0077cc;
}

/* Tabelle mit Abstand, Rahmen und alternierenden Zeilenfarben */
table {
  margin: 1rem auto;
  border-collapse: collapse;
  width: 80%;
}

th, td {
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

/* Erfolgs- und Fehlermeldungen mit Abstand und Schriftgröße */
.success-message, .error-message {
  margin-top: 1rem;
  font-size: 1.2rem;
}
</style>
