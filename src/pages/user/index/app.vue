<template>
  <div id="app">
    <h1>Use PostCSS</h1>
    <modal></modal>
    <div class="dd">
      Index
    </div>
    <img v-bind:src="logoImg">
    <h1>{{ msg }}</h1>
    <el-button @click.native="startHacking">Let's do it</el-button>
  </div>
</template>

<script>
import logo from 'assets/img/logo.png'
import modal from 'components/modal.vue'
export default {
  components: {
    modal
  },
  data () {
    return {
      msg: 'Use Vue 2.0 Today!',
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
