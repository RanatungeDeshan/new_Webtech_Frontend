<template>
  <div class="about">
    <h1 class="about-title">Our App</h1>
    <p class="about-description">
    In our App, we are dedicated to providing top-notch healthcare solutions. With a commitment to excellence, our mission is to empower healthcare professionals by simplifying patient data management. Our user-friendly platform enables you to effortlessly record and organize patient information, including appointments, in a secure and efficient manner.</p>
  </div>
</template>

<style>
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.about-title {
  font-size: 36px;
  color: black; /* Font color set to black */
  margin-bottom: 20px; /* Spacing below the title */
}

.about-description {
  font-size: 18px;
  color: darkblue ;/* Font color set to blue */
  max-width: 600px; /* Limit text width for readability */
  line-height: 1.5; /* Adjust line height for better legibility */
}

@media (min-width: 1060px) {
  .about {
    min-height: 100vh;
    color: darkblue;
    padding-top: 0; /* Remove padding for larger screens */
  }
}
</style>
