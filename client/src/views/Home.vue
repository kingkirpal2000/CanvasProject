<template>
  <div class="container" id="flexbox-container">
    <div class="column" id="class-selector">
      <h1> Navbar </h1>
    </div>
    <div class="column" id="class-viewer">
      <h1> Your Grades </h1>
    </div>
    <div class="column" id="results-banner">
      <h1> Results Banner </h1>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
};
</script>

<style lang="css">
#flexbox-container{
  display: grid;
  width: 100%;
  height: 100vh;
  grid-template-rows: 20% 70% 10%;
}
#class-selector{
  grid-row: 1 / 2;
  background: #D6E0F0;
  height: 100%;
}
#class-viewer{
  grid-row: 2 / 3;
  background: #8D93AB;
   height: 100%;
}
#results-banner{
  grid-row: 3 / 4;
  background: #393B44;
   height: 100%;
}
</style>
