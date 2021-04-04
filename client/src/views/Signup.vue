<template>
  <div class="signup">
    <div class="Temp">
      <img src="../assets/Temp_plate.svg.png" width="100" height="60">
    </div>
    <!-- ^^^ trying to add the uc seal image but it did not load in -->
    <!-- <link rel="stylesheet" type="text/css" href="style.css"> -->
    <!-- ^^^trying to do a colored header form the lessens -->
    <h1><strong>Canvas Gradebook Simulator</strong></h1> <!-- CatCourses Gradebook Manager -->
    <h3>Sign up to conveniently track your grades!</h3>
    <form @submit.prevent="validate">
      <div class="row">
        <div class="six columns">
          <label for="EmailInput">Email</label>
          <input class="u-full-width" v-model="user.email" type="email"
          placeholder="student123@ucmerced.edu" id="EmailInput">
        </div>
        <div class="six columns">
          <label for="AccessToken">Access Token</label>
          <input class="u-full-width" v-model="user.accessToken" type="text"
          placeholder="Token must be Requested from Duo" id="AccessToken">
          <a href="http://localhost:8080/?#/login">Instructions on how to get Access Tokens. (hyperlink)</a>
        </div>
      </div>
      <div class="row">
        <label for="Password">Password</label>
        <input class="u-full-width" v-model="user.password" type="password"
        placeholder="********" id="Password">
      </div>
      &ensp;
      <div class="row">
        <label for="ConfirmPassword">Confirm Password</label>
        <input class="u-full-width" v-model="user.confirmPassword" type="password"
        placeholder="********" id="CPassword">
        &ensp;
      </div>
      <input class="button-primary" type="submit" value="Submit">
      <button type="button" class="btn btn-primary"> Submit </button>
    </form>
    &ensp;
    &ensp;
    <p><a href="http://localhost:8080/?#/login">Already have an Account?</a></p>
    &ensp;
    <p><a href="http://localhost:8080/?#/login">Help</a>  ||  <a href="http://localhost:8080/?#/login">Contact</a>  ||  <a href="http://localhost:8080/?#/login"> About</a> </p>
  </div>
</template>

<script>
import { Joi } from 'vue-joi-validation';

const signupSchema = {
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu'] } }).required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
  accessToken: Joi.string().required(),
};

export default {
  name: 'Signup',
  components: {},
  data: () => ({
    errorMessage: '',
    user: {
      email: '',
      password: '',
      accessToken: '',
      confirmPassword: '',
    },
  }),
  watch: {
    user: {
      handler() {
        this.errorMessage = '';
      },
    },
  },
  methods: {
    async validate() {
      if (this.user.confirmPassword === this.user.password) {
        Joi.validate(this.user, signupSchema, (err) => {
          if (!err) {
            const newStudent = {
              email: this.user.email,
              password: this.user.password,
              accessToken: this.user.accessToken,
            };
            fetch('http://localhost:8081/auth/newstudent/', {
              method: 'POST',
              body: JSON.stringify(newStudent),
              headers: {
                'content-type': 'application/json',
              },
            }).then(async (returnedUser) => {
              const token = await returnedUser.json();
              let tokenSplit = token.token;
              tokenSplit = tokenSplit.split(' ');
              localStorage.token = tokenSplit;
              if (returnedUser.ok) {
                fetch('http://localhost:8081/tasks/', {
                  method: 'GET',
                  headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                  },
                }).then(() => {
                  fetch('http://localhost:8081/assignments/tasks/', {
                    method: 'GET',
                    headers: {
                      Authorization: `Bearer ${localStorage.token}`,
                    },
                  });
                  this.$router.push('/Dashboard');
                });
              }
            });
          } else {
            this.errorMessage = err.message;
          }
        });
      } else {
        this.errorMessage = 'Passwords do not match... Please try again!';
      }
    },
  },
};
</script>

<!--<style scoped src="../assets/skeleton.css"/>-->

<style scoped lang="css">
/*form{
  margin: auto;
  width: 80%;
}*/
/* .button-primary{
  background-color: cyan;
  color: white;
}
.button-primary{
  background-color: #FFDF00;
  color: white;
} */
/* may not need no more changed it in the skelton.css */
/* ^^supposed to change color w=once you hover over the submit button ^^*/

/*.signup{
  font-family: Arvo, 'Times New Roman', Times, serif, arvo;
  color: #FFDF00 ;
  background: #000080;
  height: 100vh;
}*/
</style>
