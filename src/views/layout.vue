<template>
  <div id="wrapper">
    <e-sider :data="data"></e-sider>
    <div id="page-wrapper" class="gray-bg">
      <e-topbar></e-topbar>
      <router-view></router-view>
      <!-- <div class="wrapper wrapper-content animated fadeInRight"> -->
      <!-- <div class="row">
          <div class="col-lg-12">
              <div class="text-center m-t-lg">
                  <h1>
                      Welcome in INSPINIA Static SeedProject
                  </h1>
                  <small>
                      It is an application skeleton for a typical web app. You can use it to quickly bootstrap your webapp projects and dev environment for these projects.
                  </small>
              </div>
            </div>
        </div> -->
      <!-- </div> -->
      <e-footer></e-footer>
    </div>
  </div>
</template>

<script>
import { menusApi } from '../api'
export default {
  name: 'layout',
  data: () => {
    return {
      data: []
    }
  },
  components: {
    'e-topbar': require('./layout/topbar').default,
    'e-footer': require('./layout/footer').default,
    'e-sider': require('./layout/sider').default
  },
  created () {
    menusApi().then((resp) => {
      console.log('res', resp)
      console.log('this', this)
      this.data = resp.data
    })
  }
}
</script>

<style scoped>

</style>
