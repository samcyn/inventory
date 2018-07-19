<template>
  <section class="section">
    <div class="container">
      <div class="columns  is-multiline is-desktop align-items-center justify-content-between">
        <div class="column is-mobile-12 is-7">
          <div>
            <h1 class="title is-3">Inventory for Business solutions</h1>
            <p>Lorem ipsum[1] dolor sit amet, consectetur adipiscing elit. 
            Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. 
            Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque. Subscript works as well!</p>
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
        <div class="column is-4">
          <div class="card">
            <div class="card-content">
              <div class="icon has-text-centered">
                <i class="fa fa-user fa-4x"></i>
              </div>
              <br/>
              <form>
                <div class="field">
                  <label class="label">Email Address</label>
                  <div class="control">
                    <input class="input is-black is-rounded" type="email" placeholder="Your Email">
                  </div>
                </div>
                <br/>
                <div class="field">
                  <label class="label">Password</label>
                  <div class="control">
                    <input class="input is-black is-rounded" type="password" placeholder="Your Password">
                  </div>
                </div>
                
                <br/>
                <div class="field is-grouped">
                  <button class="button is-primary is-rounded is-fullwidth">Sign In</button>
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


export default {
  components: {
    
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
