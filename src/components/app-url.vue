<template>
  <div class="app-url">
    <label for="url">Dataload</label>
    <textarea
      id="url"
      placeholder="Paste payload here..."
      :value="value"
      @input="$emit($event.type, $event.target.value)"
    ></textarea>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'app-url',
  props: {
    value: String
  }
}
</script>
<style lang="scss" scoped>
.app-url {
  position: relative;
  display: block;
  border-radius: 4px;
  padding: 0.5rem 1rem 0 1rem;
  background: #4E5A66;
  margin-top: 30px;
  margin-bottom: -95px;
  margin-right: 40px;
  margin-left: 40px;

  > label {
    color: #EDF3F7;
    font-family: $font-sans;
    font-size: 13px;
    font-weight: bold;
  }

  > textarea {
    color: $color-focus-alt;
    background: transparent;
    width: 100%;
    height: 140px;
    resize: none;
    border: none;
    font-size: 13px;

    &::placeholder {
      color: $color-neutral-positive-1;
    }
  }

  > div {
    margin-left: -1rem;
    margin-right: -1rem;
  }
}
</style>
