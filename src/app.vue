<template>
  <app-view id="app">
    <app-header></app-header>
    <app-view container>
      <app-panel shadow>
        <template slot="header">
          Check the payload
        </template>
        <app-panel padding primary>
          <h1>Payload</h1>
          <p>
            Your migration data is stored in a payload, which
            functions as a receipt. Enter yours below, to
            confirm that the information contained in the payload is correct.
          </p>
        </app-panel>
        <app-panel padding primary>
          <h1>Payload Information</h1>
          <p>
            The payload above contains the following information.
            Please check if the information below is correct.
          </p>
        </app-panel>
      </app-panel>
    </app-view>
  </app-view>
</template>
<script>
export default {
  name: 'index'
}
</script>
<style lang="scss"></style>
