<template>
  <p>{{ $t('hello') }}</p>
</template>

<script>
export default {
  name: 'json-inline'
}
</script>

<i18n>
  {
    "en": {
      "hello": "Hello i18n in SFC!"
    }
  }
</i18n>
