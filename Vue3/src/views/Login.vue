<template>
  <div className="container">
    <div className="row center yellow">
      <h1 className="jumbo">SWAPI</h1>
      <p className="lead">The Star Wars API</p>
    </div>
    <div className="row">
      <div className="offset-md-4 col-md-4 col-xs-12 form-box">
        <form id="login-form" @submit.prevent="login">
          <div className="form-group">
            <label>Username</label>
            <input
              className="form-control"
              placeholder="Enter your Username"
              v-model="username"
              required
            />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              className="form-control"
              placeholder="Enter your DOB"
              v-model="dob"
              required
            />
          </div>
          <div className="form-group">
            <span className="danger">{{errorMsg}}</span>
          </div>
          <button
            className="btn btn-primary btn-block"
            type="submit"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
    <div v-if="loading">
      <div className="loader"></div>
      <div id="overlay"></div>
    </div>
  </div>
</template>
<style>
  body {
    margin: 0;
    padding: 0;
    background: url("../assets/star wars.jpg");
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
  .float-right {
    float: right;
  }
  .danger {
    color: #f00;
  }
  span, label, p {
    display: block !important;
    text-align: left;
  }
  .yellow {
    color: #ffe300;
  }
  .center {
    text-align: center;
  }
  .form-box {
    background: white;
    padding: 20px;
    -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
        -ms-border-radius: 10px;
            border-radius: 10px;
  }
  .margin-top10 {
    margin-top: 10px;
  }
  .response {
    background-color: white;
    margin: 5px 0px;
    height: auto;
    border-radius: 5px;
    padding: 10px;
    width: 100%;
  }
  .jumbo {
    font-size: 65px;
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

<script>
  export default {
    name: 'Login',
    props: {},
    data: function() {
      return {
        username: '',
        dob: '',
        errorMsg: '',
        loading: false
      }
    },
    methods: {
      /**
      * this method is used to call SWAPI API on login click
      * redirect to dashboard if successful
      * otherwise show error
      */
      login: function () {
        this.loading = true;
        this.axios.get(`https://swapi.dev/api/people/?search=${this.username}`).then((resp) => {
          this.loading = false;
          let len = resp.data.results.length;
          let isMatch = false;
          for (let i = 0; i < len; i++) {
            if (resp.data.results[i].name === this.username) {
              isMatch = true;
              if (resp.data.results[i].birth_year === this.dob) {
                this.errorMsg = "";
                this.$store.commit("addUser", this.username);
                this.$router.push('/home');
              } else {
                this.errorMsg = "DOB does not match";
              }
              break;
            }
          }

          if (!isMatch) {
            this.errorMsg = "Username does not exist";
          }
        }).catch(() => {
          alert('Something went wrong');
          this.loading = false;
        })
      }
    }
  }
</script>