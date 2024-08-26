<template>
  <Button variant="outline" @click="locale === 'en' ? setLocale('vi') : setLocale('en')">{{
    locale === 'en' ? 'VI' : 'EN'
  }}</Button>
</template>

<script setup>
const { locale, setLocale } = useI18n()
</script>

<style lang="scss" scoped></style>
