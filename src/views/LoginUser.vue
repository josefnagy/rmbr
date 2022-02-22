<template>
  <div class="page-wrapper">
    <div class="logo-wrapper">
      <div class="content-wrap">
        <router-link class="logo" to="/">
          <span class="logo-title">rmbr</span>
          <span class="logo-dot"
            ><svg width="17" height="17">
              <rect
                width="17"
                height="17"
                style="fill: rgb(255, 109, 4); stroke-width: 0"
              /></svg
          ></span>
        </router-link>
        <div class="copy">
          <p>remember <span class="orange"> everything</span></p>
          <p>forget <span class="orange">nothing.</span></p>
        </div>
      </div>
    </div>
    <div class="form-wrapper">
      <form class="form" @submit.prevent="onLogin">
        <h3>Login</h3>
        <input
          type="email"
          placeholder="Your Email"
          class="textInput"
          v-model.trim.lazy="email"
        />
        <input
          type="password"
          placeholder="Your Password"
          class="textInput"
          v-model.lazy="password"
        />
        <button type="submit" class="btn">Login</button>
      </form>
      <p class="acc">
        Don't have an account?
        <router-link :to="{ path: 'register' }">Create one!</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      passwordCheck: "",
      errors: [],
    };
  },
  methods: {
    onLogin() {
      // check if email is valid

      // dispatch action
      this.$store
        .dispatch("user/login", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "decks" });
        })
        .catch((err) => {
          this.error = err.response.data.error;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  display: grid;
  grid-template-columns: 25% auto;
  height: 100%;
}

.logo-wrapper {
  border-right: 1px solid $black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.copy {
  align-self: flex-end;
  text-align: right;
  font-size: 2rem;
  font-weight: 300;
}

.orange {
  color: $primary;
}

.logo {
  font-family: $text-heading;
  color: $black;
  text-decoration: none;
  font-size: 7.5rem;
  text-transform: uppercase;
  font-weight: 600;
  .logo-dot {
    margin-left: 0.5rem;
  }
}

.form-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form {
  display: flex;
  flex-direction: column;
  width: 27rem;
  gap: 15px;

  h3 {
    color: $primary;
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
  }

  .textInput {
    padding: 1rem 1rem;
  }

  .btn {
    padding: 5px 10px;
    font-size: 1.8rem;
    width: 17rem;
    align-self: flex-end;
  }
}
.acc {
  margin-top: 4rem;
  font-size: 1.2rem;
  color: $medium-gray;

  a {
    color: $primary;
    text-decoration: none;
  }
}
</style>
