<template>
  <div id="app">
    <div class="dd">
      Home22222
    </div>
    <img v-bind:src="logoImg">
    <h1></h1>
    <el-button @click.native="startHacking">Let's do it</el-button>
  </div>
</template>

<script>
import logo from 'assets/img/logo.png'
export default {
  data () {
    return {
      msg: 'Use Vue 2.0 Today!!!!!!!',
      logoImg: logo
    }
  },

  methods: {
    startHacking () {
      this.$notify({
        title: 'It Works',
        message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
        duration: 6000
      })
    }
  }
}
</script>

<style lang="postcss">
  body {
    background-color: #f5f5f5;
  }
  :root h1 {
   --color: red;
   display: flex;
   color: var(--color);
  }
</style>
