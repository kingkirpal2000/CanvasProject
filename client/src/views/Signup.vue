<template>
  <div class="signup">
    <!-- <div class="UCSeal">
      <img src="/Users/darshwakdhami/Desktop/Side_Project">
    </div> -->
    <!-- ^^^ trying to add the uc seal image but it did not load in -->
    <!-- <link rel="stylesheet" type="text/css" href="style.css"> -->
    <!-- ^^^trying to do a colored header form the lessens -->
    <h1><strong>CatCourses Gradebook Manager</strong></h1>
    <h3>Sign up to conveniently track your grades!</h3>
    <form @submit="validate()">
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
          Instructions on how to get Access Tokens. (hyperlink)
        </div>
      </div>
      <div class="row">
        <label for="Password">Password</label>
        <input class="u-full-width" v-model="user.password" type="password"
        placeholder="********" id="Password">
      </div>
      <div class="row">
        <label for="ConfirmPassword">Confirm Password</label>
        <input class="u-full-width" v-model="user.confirmPassword" type="password"
        placeholder="********" id="CPassword">
      </div>
      <input class="button-primary" type="submit" value="Submit">
    </form>
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
              console.log(tokenSplit);
              if (returnedUser.ok) {
                fetch('http://localhost:8081/tasks/', {
                  method: 'GET',
                  headers: {
                    Authorization: `Bearer ${tokenSplit[0]}`,
                  },
                }).then(() => {
                  fetch('http://localhost:8081/assignments/tasks/', {
                    method: 'GET',
                    headers: {
                      Authorization: `Bearer ${tokenSplit[0]}`,
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

<style scoped src="../assets/skeleton.css"/>

<style scoped lang="css">
form{
  margin: auto;
  width: 80%;
}
.button-primary{
  background-color: cyan;
  color: white;
}
.button-primary:hover{
  background-color: #FFDF00;
  color: white;
}
/* ^^supposed to change color w=once you hover over the submit button ^^*/

.signup{
  font-family: Arvo, 'Times New Roman', Times, serif, arvo;
  color: #FFDF00 /*https://www.rapidtables.com/web/color/Gold_Color.html*/;
   background: #000080; /*https://www.rapidtables.com/web/css/css-color.html#blue */

}
</style>
