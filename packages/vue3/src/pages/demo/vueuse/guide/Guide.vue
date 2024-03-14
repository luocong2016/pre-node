<template>
  <Card :title="route.meta?.title">
    <RouterView />
  </Card>
</template>

<script lang="ts" setup>
import { RouterView, useRoute } from "vue-router"
import { Card } from "ant-design-vue"

const route = useRoute()
</script>
