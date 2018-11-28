<template>
  <div :class="homeStyle.home">
    <h1>Welcome to the SPA</h1>
    <div class="row">
      <div :class="[homeStyle.welcomeMessage, 'column']">
        <p>Just float and wait for the wind to blow you around. Here's another little happy bush.
          Let all these little things happen. Don't fight them. Learn to use them. No worries.
          No cares.</p>
        <p>How do you make a round circle with a square knife? That's your challenge for the day.
          Anytime you learn something your time and energy are not wasted. Let's get crazy.
          At home you have unlimited time. We need a shadow side and a highlight side. Nothing's
          gonna make your husband or wife madder than coming home and having a snow-covered dinner.</p>
        <p>This is your world, whatever makes you happy you can put in it. Go crazy. Everybody needs a friend.
          It's important to me that you're happy. Isn't that fantastic? You can just push a little tree out of
          your brush like that. They say everything looks better with odd numbers of things.
          But sometimes I put even numbers—just to upset the critics. Maybe we got a few little happy
          bushes here, just covered with snow.</p>
        <p>Didn't you know you had that much power? You can move mountains. You can do anything.
          Don't kill all your dark areas - you need them to show the light. It just happens -
          whether or not you worried about it or tried to plan it.</p>
      </div>
      <div class="column">
        <router-view></router-view>
      </div>
    </div>
    <chat></chat>
  </div>
</template>
<script>

  import Chat from '../components/Chat.vue';
  export default {
    components: { Chat }
  }

</script>
<style lang="scss" module="homeStyle">
  .home {
    @include app-margin;
    padding-top: 40px;
    overflow: auto;
  }

  .welcomeMessage {
    div {
      padding-bottom: 10px;

      &:last-child {
        padding-bottom: 0;
      }
    }
  }
</style>