<template>
  <div>
    <Header />
    <Home />
  </div>
</template>

<script>
  import Component from 'vue-class-component';
  import Home from '@/components/Home.vue';
  import Header from '@/components/Header.vue';
  import Spinner from '@/components/Spinner.vue';
  import { mapState } from 'vuex';

  @Component({
    components: { Home, Header, Spinner },
    name: 'App',
    computed: mapState({
      loading: state => state.loaders.length > 0,
      hasErrors: state => state.errors.length > 0
    })
  })
  class App { }
  export default App;

</script>
