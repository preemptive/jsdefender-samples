<template>
  <div className="container">
    <div className="row">
      <div className="col-md-8">
        <div className="yellow">
          <h1>Welcome! {{user}}</h1>
        </div>
      </div>
      <div className="col-md-4">
        <button
          className="btn btn-primary float-right margin-top10"
          @click="signout()"
        >
          Logout
        </button>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
        <div className="response" v-for="item in data" :key="item.name">
          <p>Planet Name: {{item.name}}</p>
          <p>Rotation period: {{item.rotation_period}}, Orbital period: {{item.orbital_period}}, Diameter: {{item.diameter}}</p>
          <p>Climate: {{item.climate}}, Gravity: {{item.gravity}}, Terrain: {{item.terrain}}</p>
          <p>Surface water: {{item.surface_water}}, Population: {{item.population}}</p>
        </div>
      </div>
    </div>
    <div v-if="loading">
      <div className="loader"></div>
      <div id="overlay"></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Home',
    props: {},
    data: () => {
      return {
        user: '',
        data: [],
        loading: false
      }
    },
    /**
    * On mount check if the user exist in store
    * then, fetch planets data
    * otherwise, logout
    */
    mounted() {
      this.user = this.$store.getters.getUser;
      if (this.user === '') {
        this.signout();
      } else {
        this.loading = true;
        this.fetchData();
      }
    },
    methods: {
      /**
       * this method is used to logout the user and redirect to login page
       */
      signout() {
        this.$router.go(-1);
      },
      /**
      * this method is used to get planets information
      */
      fetchData() {
        this.axios.get('https://swapi.dev/api/planets/?page=1').then((resp) => {
          this.loading = false;
          this.data = resp.data.results;
        }).catch(() => {
          alert('Something went wrong');
          this.loading = false;
        });
      }
    }
  }
</script>