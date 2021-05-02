<template>
  <div>
    <ContentLaboratorium v-if="$route.params.content === 'laboratorium'" />
    <ContentRadiologi v-else-if="$route.params.content === 'radiologi'" />
  </div>
</template>
<script>
import ContentLaboratorium from '@/components/ContentLaboratorium/ContentLaboratorium.vue'
import ContentRadiologi from '@/components/ContentRadiologi/ContentRadiologi.vue'

export default {
  components: {
    ContentLaboratorium,
    ContentRadiologi,
  },
}
</script>
