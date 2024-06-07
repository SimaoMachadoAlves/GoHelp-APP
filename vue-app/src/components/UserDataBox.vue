<template>
  <div class="form">
    <div class="form-content">
      <form>
        <div class="field input-field">
          <label for="usernameText">Nome do utilizador:</label>
          <input
            id="usernameText"
            type="text"
            class="input"
            v-model="name"
            readonly
          />
        </div>
        <div class="field input-field">
          <label for="mailText">Email do utilizador:</label>
          <input
            id="mailText"
            type="text"
            class="input"
            v-model="mail"
            readonly
          />
        </div>
        <div class="field input-field">
          <label for="contactText">Número de telemóvel:</label>
          <input
            id="contactText"
            type="text"
            class="input"
            v-model="contact"
            readonly
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserDataBox",
  data() {
    return {
      name: "",
      mail: "",
      contact: "",
    };
  },
  created() {
    const userData = JSON.parse(sessionStorage.getItem("loginApp")) || [];

    this.name = userData.name;
    this.mail = userData.email;
    this.contact = userData.contact;
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.form {
  position: block;
  margin-left: auto;
  margin-right: auto;
  width: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid #6c757d;
  border-radius: 1rem;
}

.form-content {
  width: 400px;
  padding: 20px;
  border-radius: 1rem;
  background-color: #f0f8ff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
}

.form-content header {
  font-size: 24px;
  font-weight: 600;
  color: #000000;
  text-align: center;
  margin-bottom: 20px;
}

.field {
  margin-bottom: 20px;
}

.field input {
  width: 100%;
  height: 40px;
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
  background-color: #dee2e6;
}

.field label {
  font-size: 16px;
  color: #6c757d;
  margin-bottom: 5px;
  display: block;
}

.field button {
  width: 100%;
  height: 40px;
  background-color: #597081;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}
</style>
