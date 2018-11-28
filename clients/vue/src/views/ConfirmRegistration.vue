<template>
  <div class="confirmation-container">
    <Spinner v-if="loading"></Spinner>
    <div v-if="registeredSession !== undefined" class="sessionDetails">
      <h3>Success! Your registration is complete</h3>
      <h4>
        Appointment:&nbsp;
        <b>
          {{registeredSession.session.date | dateOnly }} - {{ registeredSession.session.date | timeOnly }}
        </b>
      </h4>
      <div v-if="lastRegistration && lastRegistration.sessionId === sessionId">
        <h4>Your Registration Details</h4>
        <h5>Name: <b>{{lastRegistration.registration.name}}</b></h5>
        <h5>Email: <b>{{lastRegistration.registration.email}}</b></h5>
        <h5>Treatment: <b>{{lastRegistration.registration.treatment}}</b></h5>
      </div>
      <div class="registrationList">
        <h3>Complete Registrant List</h3>
        <table>
          <tr>
            <th><b>Name</b></th>
            <th><b>Email</b></th>
            <th><b>Treatment</b></th>
          </tr>
          <tr v-for="(reg, index) of registeredSession.registrations" :key="index">
            <td>{{reg.name}}</td>
            <td>{{reg.email}}</td>
            <td>{{reg.treatment}}</td>
          </tr>
        </table>
      </div>
    </div>

    <div v-if="!registeredSession" class="error-container">
      <h3>Sorry, Registration Not Found</h3>
    </div>

    <router-link to="/schedule">Back to Schedule</router-link>
  </div>

</template>
<script>

  import { mapGetters, mapActions, mapState } from 'vuex';
  import Spinner from '@/components/Spinner.vue';

  export default {
    components: { Spinner },
    created: async function() {
      console.log('created', Date.now());
      try {
        await this.loadSessionDetails(this.$route.params.id);
      } catch (e) {
        // cheesy error handling, folks
        alert('save failed...', JSON.stringify(e));
      }
    },
    computed: {
      sessionId: function() {
        return parseInt(this.$route.params.id);
      },
      loading: function() {
        return this.$store.state.loaders.indexOf('registering') >= 0
      },
      ...mapGetters(['loaders', 'registeredSession', 'lastRegistration'])
    },
    methods: {
      ...mapActions({loadSessionDetails: 'loadSessionDetails'})
    }
  }
</script>

<style type="scss" scoped>
  .sessionDetails {
    h3 {
      margin: 0;
    }

    padding: 0 0 50px 0;
  }

  .registrationList {
    background: $color-white;
    border: 1px solid $color-border;
    border-radius: 6px;
    padding: 30px;
    margin: 30px 0 0 0;
    width: 100%;

    h2 {
      color: $color-text
    }

    table {
      border-collapse: collapse;
      border-top: 1px solid $color-border;
      width: 100%;
    }

    tr {
      text-align: left;
      border-bottom: 1px solid $color-border;
      height: 50px;

      &:nth-child(even) {
        background: $color-background;
      }
    }
  }

  .button {
    width: 130px;
    margin: 10px 0;
    background: $color-green;
    text-decoration: none;
    padding: 10px 20px;
    border: 1px solid $color-border;
    border-radius: 6px;
    color: $color-white;

    &:hover {
      background: darken($color-green, 10%);
    }
  }


</style>
