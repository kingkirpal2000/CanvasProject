<template>
  <div class="signup">
    <h1><strong>CatCourses Gradebook Manager</strong></h1>
    <h3>Sign up to conveniently track your grades!</h3>
    <form>
      <div class="row">
        <div class="six columns">
          <label for="EmailInput">Email</label>
          <input class="u-full-width" v-model="user.email" type="email"
          placeholder="student123@ucmerced.edu" id="EmailInput">
        </div>
        <div class="six columns">
          <label for="AccessToken">Access Token</label>
          <input class="u-full-width" v-model="user.accessToken" type="text"
          placeholder="More instructions coming soon" id="AccessToken">
        </div>
      </div>
      <div class="row">
        <label for="Password">Password</label>
        <input class="u-full-width" v-model="user.password" type="password"
        placeholder="********" id="Password">
      </div>
      <input class="button-primary" type="submit" value="Submit">
    </form>
  </div>
</template>

<script>
import vueJoiValidation, { Joi } from 'vue-joi-validation';

export default {
  name: 'Signup',
  components: {},
  data: () => ({
    user: {
      email: '',
      password: '',
      accessToken: '',
    },
  }),
  methods: {

  },
};
</script>

<style scoped src="../assets/skeleton.css"/>

<style scoped lang="css">
form{
  margin: auto;
  width: 80%;
}
</style>
