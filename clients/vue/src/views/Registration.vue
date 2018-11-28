<template>
<div>
  <h3>Register for your appointment:</h3>

   <Spinner v-if="loading" />

   <form v-if="!loading" class="form" @submit.prevent="submit">
     <h4><b>{{ session.date | dateOnly }} - {{ session.date | timeOnly }}</b></h4>
     <div class="formGroup">
     <div class="form-control">
       <label for="name">Name</label>
       <input id="name" type="text" required v-model="form.name">
     </div>
     <div class="formGroup">
       <label for="email">Email</label>
       <input id="email" type="text" required v-model="form.email">
     </div>
     <div class="formGroup">
       <label for="treatment">Treatment</label>
       <select id="treatment" required v-model="form.treatment">
         <option v-for="(treatmentOption, index) in treatmentOptions" :key="index">{{ treatmentOption }}</option>
       </select>
     </div>
     <div class="button-bar">
       <button class="button primary">Register!</button>
     </div>
     </div>
   </form>
 </div>
</template>
<script>

  import { mapState } from 'vuex';

  export default {
    computed: {
      session() {
         const sessionId = parseInt(this.$route.params.id);
         return this.$store.getters.sessionById(sessionId);
      },
      ...mapState({
        loading: state => state.loaders.indexOf('registering') > 0
      })
   },
    data() {
        return {
            form: {
                email: '',
                name: '',
                treatment: '',
            },
            treatmentOptions: ['Aromatherapy', 'Exfoliation', 'Chemical peel', 'Waxing', 'Waning']
        }
    },
    methods: {
        async submit() {
          await this.$store.dispatch('addRegistrationToSession', { sessionId: this.session.id, registration: this.form });
          this.$router.push(`/registration/${this.$route.params.id}/confirmation`);
        },
    },
  };
</script>

<style lang="scss" scoped>

  $input-radius: 6px;
  $input-width: 100%;
  $input-height: 35px;
  $font-size: 16px;

  form.form {
    background: $color-white;
    box-sizing: border-box;
    border: 1px solid $color-border;
    border-radius: 8px;
    padding: 30px;

    label {
      display: block;
      font-size: 16px;
      color: $color-blue;
      padding: 0 0 5px 0
    }

    select {
      font-size: $font-size;
      border: 1px solid $color-border;
      border-radius: $input-radius;
      background: $color-background;
      width: $input-width / 2;
      height: $input-height;
      padding: 5px;
      margin-bottom: 5px;
    }

    option {
      color: $color-blue;
    }

    input {
      font-size: $font-size;
      border: 1px solid $color-border;
      border-radius: $input-radius;
      background: $color-background;
      width: $input-width;
      height: $input-height;
      margin: 0 0 10px 0;
    }

    input[type=submit] {
      margin: 10px 0;
      background: $color-green;
      color: $color-white;
      width: $input-width / 2;
      height: $input-height + 10;
      &:hover {
        background: darken($color-green, 10%);
      }
    }
  }
</style>
