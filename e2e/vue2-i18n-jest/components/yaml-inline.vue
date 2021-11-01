<template>
  <p>{{ $t('hello') }}</p>
</template>

<script>
export default {
  name: 'yaml-inline'
}
</script>

<i18n lang="yaml">
  en:
    hello: "hello world!"
  ja:
    hello: "こんにちは、世界！"
</i18n>
