<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ $route.params.id }}</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $route.params.id }}</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <div id="container">
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
    </ion-content>
  </ion-page>
</template>

<script>
  import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';

  export default {
    name: 'Folder',
    components: {
      IonButtons,
      IonContent,
      IonHeader,
      IonMenuButton,
      IonPage,
      IonTitle,
      IonToolbar
    },
    data: () => {
      return {
        data: [],
        loading: false
      }
    },
    methods: {
      /**
      * this method is used to fetch list of planets from SWAPI, and set data
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
    },
    /**
    * fetch list of planets from SWAPI on mount
    */
    mounted() {
      this.fetchData();
    },
  }
</script>

<style scoped>
  #container {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    background: url("../images/star\ wars.jpg");
  }

  #container strong {
    font-size: 20px;
    line-height: 26px;
  }

  #container p {
    font-size: 16px;
    line-height: 22px;
    color: #8c8c8c;
    margin: 0;
  }

  #container a {
    text-decoration: none;
  }

  .loader {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1;
    width: 150px;
    height: 150px;
    margin: 40px 0 0 -30px;
    border: 7px solid #f3f3f3;
    -webkit-border-radius: 50px;
      -moz-border-radius: 50px;
        -ms-border-radius: 50px;
            border-radius: 50px;
    border-top: 7px solid #000;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
  }
  @-webkit-keyframes spin {
    0% {
    }
    100% {
    }
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .animate-bottom {
    position: relative;
    animation-name: animatebottom;
    animation-duration: 1s;
  }
  @-webkit-keyframes animatebottom {
    from {
      bottom: -100px;
      opacity: 0;
    }
    to {
      bottom: 0;
      opacity: 1;
    }
  }
  @keyframes animatebottom {
    from {
      bottom: -100px;
      opacity: 0;
    }
    to {
      bottom: 0;
      opacity: 1;
    }
  }

  span, label, p {
    display: block !important;
    text-align: left;
  }

  .response {
    background-color: white;
    margin: 5px 0px;
    height: auto;
    border-radius: 5px;
    padding: 10px;
    width: 100%;
  }

  .row {
    margin: 0 !important;
  }

  #overlay {
    position: fixed;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    z-index: 2;
    cursor: pointer;
  }
</style>