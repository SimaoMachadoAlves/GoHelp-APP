<template>
  <div class="form">
    <div class="form-content">
      <header>Faça o seu Login aqui</header>
      <form @submit.prevent="login">
        <div class="field input-field">
          <input
            type="text"
            placeholder="Email"
            class="input"
            v-model="email"
          />
        </div>

        <div class="field input-field">
          <input
            type="password"
            placeholder="Password"
            class="password"
            v-model="password"
          />
        </div>

        <div class="field button-field">
          <button type="submit" class="btn btn-primary" id="save-btn-login">
            Entrar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginBox",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      const user_record =
        JSON.parse(localStorage.getItem("utilizadoresApp")) || [];

      // Verifica se há um user com o email e senha fornecidos
      const currentUser = user_record.find(
        (user) => user.email === this.email && user.password === this.password
      );

      if (currentUser) {
        // Cria um objeto com os dados do utilizador logado
        const userLoginData = {
          name: currentUser.name,
          email: currentUser.email,
          contact: currentUser.contact,
        };

        // Armazena o objeto de login no sessionStorage
        sessionStorage.setItem("loginApp", JSON.stringify(userLoginData));

        // Redireciona para a página de destino após o login bem-sucedido
        this.$router.push({ name: "homePage" });
      } else {
        alert("Credenciais inválidas!");
      }
    },
  },
};
</script>

<style scoped>
.form {
  position: relative;
  margin-left: 10%;
  margin-right: 10%;
  padding: 10%;
  border-radius: 2rem;
  background-color: #fff;
}

.form-content {
  left: 50%;
}

.text-container p {
  margin-top: 60px; /* Adicionar margem acima do parÃ¡grafo */
  margin-bottom: 60px;
  text-align: center;
}

.forms.show-signup .form.signup {
  opacity: 0;
  pointer-events: none;
}
.forms.show-signup .form.login {
  opacity: 0;
  pointer-events: none;
}
header {
  font-size: 24px;
  font-weight: 600;
  color: #232836;
  text-align: center;
}
form {
  margin-top: 30px;
}
.form .field {
  position: relative;
  height: 50px;
  width: 100%;
  margin-top: 20px;
  border-radius: 6px;
}
.field input,
.field button {
  height: 100%;
  width: 100%;
  border: none;
  font-size: 16px;
  font-weight: 400;
  border-radius: 6px;
  background-color: #f0f8ff;
}
.field input {
  outline: none;
  padding: 0 15px;
}
.field input:focus {
  border-bottom-width: 2px;
}
.eye-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  font-size: 18px;
  color: #8b8b8b;
  cursor: pointer;
  padding: 5px;
}
.field button {
  height: 100%;
  width: 75%;
  background-color: #597081;
  transition: all 0.3s ease;
  cursor: pointer;
  border-radius: 3rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.form-link span,
.form-link a {
  font-size: 14px;
  font-weight: 400;
  color: #232836;
}
.form a {
  color: #0171d3;
  text-decoration: none;
}
.form-content a:hover {
  text-decoration: underline;
}
.line {
  position: relative;
  height: 1px;
  width: 100%;
  margin: 36px 0;
}
.line::before {
  content: "Or";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #8b8b8b;
  padding: 0 15px;
}
</style>
