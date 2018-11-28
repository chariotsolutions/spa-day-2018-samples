<template>
  <div :class="style.header">
    <router-link to="/">
    <img :class="style.spaLogo" src="../assets/logo.png"/>
    </router-link>
    <span :class="style.title">Chariot SPA Day</span>
    <router-link to="/">
    <img :class="style.chariotLogo" src="../assets/chariot.svg" />
    </router-link>
  </div>
</template>

<script>
  export default {
  }

</script>

<style lang="scss" module="style">
.header {
  height: 143px;
  min-height: 143px;
  background: $color-blue;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.spaLogo {
  display: none;

  @include breakpoint(phablet) {
    display: block;
    width: auto;
    height: 85px;

    &:hover {
      animation: spin infinite 20s linear;
    }
  }
}

.title {
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-size: 36px;
  padding-left: 10px;

  color: $color-white;
}

.chariotLogo {
  display: none;

  @include breakpoint(phablet) {
    display: block;
    width: 145px;
    height: 45px;
    margin-left: auto;
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>

