<template>
  <span>
    {{ getDate }}
  </span>
</template>
<script>
export default {
  props: {
    date: {
      type: String,
      default: null,
    },
  },
  computed: {
    getDate() {
      const newDate = new Date(this.date)
      const tanggal = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate()
      const bulan = newDate.getMonth() < 10 ? `0${newDate.getMonth()}` : newDate.getMonth()
      console.log()
      return `${tanggal} - ${bulan} - ${newDate.getFullYear()}`
    },
  },
}
</script>
