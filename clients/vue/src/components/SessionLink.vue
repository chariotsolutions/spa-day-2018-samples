<template>
    <div class="sessionLink" @click="register(session.id)">
        <div>
            <div class="time">{{session.date | timeOnly }}, {{ session.date | dateOnly }}</div>
        </div>
        <div class="attendees">
            Attendees:  {{session.subscriptionCount}}
        </div>
        <a href="#" class="link" @click="register(session.id)"></a>
    </div>

</template>

<script>
    export default {
      props: {
        session: {
          type: Object
        }
      },
      methods: {
        register(id) {
          this.$router.push(`/registration/${id}`);
        }
      }
    }
</script>
<style lang="scss">
    .sessionLink {
        height: 89px;
        background: white;
        border-bottom: 1px solid $color-border;
        padding: 0 30px;
        color: $color-text;

        display: flex;
        align-items: center;

    &:last-child {
         border-bottom: 0;
     }
    }

    .time {
        font-weight: bolder;
    }

    .date {
        font-weight: lighter;
    }

    .attendees {
        margin-left: auto;
    }

    .link {
        border: 4px solid #24BA8C;
        border-bottom: 0;
        border-left: 0;
        box-sizing: border-box;
        transform: matrix(0.71, 0.74, -0.68, 0.71, 0, 0);
        width: 16.48px;
        height: 16.48px;
    }
</style>
