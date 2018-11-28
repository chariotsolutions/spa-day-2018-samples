<template>
    <div>
        <Spinner v-if="loading"/>
        <h3>Choose an appointment time:</h3>
        <div class="schedule">
            <SessionLink
                    v-for="s in sessions"
                    :key="s.id"
                    :session="s">
            </SessionLink>
        </div>
    </div>
</template>

<script>
    import SessionLink from '../components/SessionLink';
    import Spinner from '@/components/Spinner';
    import {mapState} from 'vuex';

    export default {
        components: {SessionLink, Spinner},
        computed: mapState({
          // TODO: why do I need to destructure this to extract the Proxy?
          sessions: state => { 
            return [ 
            ...state.sessions
            ]; 
          },
          loading: state => state.loaders.indexOf('sessions') > -1
        })
    }
</script>

<style type="scss" scoped>
    .schedule {
        background: $color-white;
        border: 1px solid $color-border;
        box-sizing:border-box;
        border-radius: 8px;
        overflow:hidden; 
    }
</style>
