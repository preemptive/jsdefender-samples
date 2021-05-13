<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Movies & Shows</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Movies & Shows</ion-title>
        </ion-toolbar>
      </ion-header>
      <div id="container">
        <div className="row">
          <div className="col-md-12">
            <div className="response" v-for="item in data" :key="item.name">
              <p className="card-title">{{item.name}}</p>
              <table className="table table-borderless table-responsive">
                <tbody>
                  <tr className="card-heading-1">
                    <td>Title</td>
                    <td>Director</td>
                    <td>Producer</td>
                    <td>Release date</td>
                  </tr>
                  <tr className="card-heading-2">
                    <td>{{item.title}}</td>
                    <td>{{item.director}}</td>
                    <td>{{item.producer}}</td>
                    <td>{{item.release_date}}</td>
                  </tr>
                </tbody>
              </table>
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
  import { getFilmData } from "../util/provider";

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
        this.loading = true;
        getFilmData()
        .then((resp) => {
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