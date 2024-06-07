<template>
  <b-container id="green_container">
    <br />
    <img
      class="components"
      src="../assets/cloud-upload.png"
      alt="Upload icon"
    />
    <br />
    <label for="fileInput" class="file-label"> Selecionar ficheiro </label>
    <input
      id="fileInput"
      class="file-input components"
      type="file"
      name="filename"
      @change="handleFileChange"
    />
    <h6>Faça upload a ficheiros</h6>
    <br /><br />
  </b-container>
</template>

<script>
export default {
  name: "UploadFileBox",
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const fileContentAsBase64 = reader.result;
        const sessionStorageData = sessionStorage.getItem("selectedEvent");
        if (sessionStorageData) {
          const eventData = JSON.parse(sessionStorageData);
          eventData.ficheiros.push({
            nome: file.name,
            conteudo: fileContentAsBase64,
          });
          sessionStorage.setItem("selectedEvent", JSON.stringify(eventData));
        } else {
          console.error(
            "Não foi possível encontrar os dados do evento na sessionStorage."
          );
        }
      };

      reader.readAsDataURL(file);
    },
  },
};
</script>

<style scoped>
#green_container {
  background-color: #41776c;
  text-align: center;
  border-radius: 2rem;
}

.components {
  display: block;
  margin: 0 auto;
}

.file-label {
  display: inline-block;
  background-color: #ffffff;
  color: #6c757d;
  font-weight: bold;
  font-size: 1.1rem;
  padding: 10px 40px;
  border-radius: 2rem;
}

.file-input {
  display: none; /* Ocultar o input file padrão */
}

h6 {
  color: white;
  font-weight: bold;
  margin-top: 1rem;
}
</style>
