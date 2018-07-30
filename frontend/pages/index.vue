<template>
  <section class="section">
    <div class="container">
      <div class="columns is-multiline align-items-center justify-content-between">
        <div class="column is-12-mobile is-7-tablet is-7-desktop">
          <div>
            <h1 class="title is-3">Inventory for Business solutions</h1>
            <p> A demo of an Inventory App. Work still in progress login to explore what's inside. See you there.</p>
            <br/>
            <div class="field is-grouped">
              <p class="control">
                <a class="button is-primary is-rounded">
                  Get Started
                </a>
              </p>
              <p class="control">
                <a class="button is-black is-rounded">
                  Contact Us
                </a>
              </p>
            </div>
          </div>
        </div>
        <div class="column is-12-mobile is-4-tablet is-4-desktop">
          <div class="card">
            <div class="card-content">
              <div class="icon has-text-centered">
                <i class="fa fa-user fa-4x has-text-primary"></i>
              </div>
              <br/>
              <form v-on:submit.prevent="login">
                <div class="field">
                  <label class="label">Email Address</label>
                  <div class="control">
                    <input class="input is-black is-rounded" type="email" placeholder="Your Email" v-model="user.email">
                  </div>
                </div>
                <br/>
                <div class="field">
                  <label class="label">Password</label>
                  <div class="control">
                    <input class="input is-black is-rounded" type="password" placeholder="Your Password" v-model="user.password" @keyup="removeErrorMessage">
                    <p class="help is-danger" v-if="error">{{error ? error : 'mismatch email'}}</p>
                  </div>
                </div>
                
                <br/>
                <div class="field is-grouped">
                  <button type="submit" class="button is-primary is-rounded is-fullwidth"  v-bind:class="{'is-loading': isLoading }">Sign In</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { setUser } from '~/utils/auth'

export default {
  layout: 'default',
  middleware: 'anonymous',
  data () {
    return {
      user: {},
      error: null,
      isLoading: false
    }
  },
  methods: {
    async login () {
      // show loader
      this.isLoading = true;
      try{
        const user = this.user;
        const response = await this.$axios.$post('user/login', { user });
        // console.log(response.payload);
        setUser(response.payload.token, response.payload.user);
        // redirect to dashboard
        this.$router.push({
          name: 'dashboard'
        });
        // hide loader
        this.isLoading = false;
      }
      catch(err){
        this.error = err.response.data.payload;
        this.isLoading = false;
        console.log('error message', {err});
      }
    },
    removeErrorMessage () {
      this.error = null;
    }
  }
}
</script>

<style scoped>
  .align-items-center {
    align-items: center;
  }
  .justify-content-between{
    justify-content: space-between;
  }
</style>
