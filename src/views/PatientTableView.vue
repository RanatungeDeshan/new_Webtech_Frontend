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
          <th>Action</th> <!-- Neue Spalte für die Bearbeitungsaktion -->
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
          <td>
            <!-- Button zum Bearbeiten, der die Edit-Seite für den ausgewählten Patienten öffnet -->
            <button type="button" @click="editPatient(patient.id)">Edit</button>
            <button type="button" class="delete" @click="deletePatient(patient.id)">Delete</button>
          </td>
        </tr>
        <div v-if="message">{{ message }}</div>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import moment from 'moment'
import { useRouter } from 'vue-router';

const router = useRouter();

const message = ref('') // Nachricht, die angezeigt wird

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

// Funktion, um zur Edit-Seite für den ausgewählten Patienten zu navigieren
function editPatient(patientId: number | undefined) {
  if (patientId) {
    router.push(`/edit/${patientId}`);
  }
}

// Funktion, um den ausgewählten Patienten zu löschen
async function deletePatient(patientId: number | undefined) {
  if (patientId) {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
    const endpoint = `${baseUrl}/patients/${patientId}`
    const requestOptions: RequestInit = {
      method: 'DELETE',
      redirect: 'follow'
    }
    await fetch(endpoint, requestOptions)
      .then((response) => {
        if (response.ok) {
          // Nach erfolgreichem Löschen den Patienten aus der Liste entfernen
          patients.value = patients.value.filter(patient => patient.id !== patientId)
          message.value = 'Patient erfolgreich gelöscht.' 
        } else {
          console.error('Error:', response)
          message.value = 'Fehler beim Löschen.' 
        }
      })
      .catch((error) => console.error('Error:', error))
      
  }
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
  width: 175%;
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

.delete {
  font-size: large;
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: #ff0000;
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
