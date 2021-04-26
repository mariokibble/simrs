<template>
  <div>
    <ContentLaboratorium v-if="$route.params.content === 'laboratorium'" />
    <ContentRadiologi v-else-if="$route.params.content === 'radiologi'" />
  </div>
</template>
<script>
import { ContentLaboratorium, ContentRadiologi } from '@/components/ContentRekamedis'

export default {
  components: {
    ContentLaboratorium,
    ContentRadiologi,
  },
}
</script>
