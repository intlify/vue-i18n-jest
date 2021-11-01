<template>
  <p>{{ $t('hello') }}</p>
</template>

<script>
export default {
  name: 'json5-inline'
}
</script>

<i18n lang="json5">
  {
    "en": {
      "hello": 'Hello "i18n" in SFC!'
    }
  }
</i18n>
