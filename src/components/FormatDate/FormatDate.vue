<template>
  <span>
    {{ getDate }}
  </span>
</template>
<script>
export const formattedDate = date => {
  const newDate = new Date(date)
  const tanggal = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate()
  const bulan = newDate.getMonth() < 10 ? `0${newDate.getMonth()}` : newDate.getMonth()
  return `${tanggal} - ${bulan} - ${newDate.getFullYear()}`
}

export default {
  props: {
    date: {
      type: String,
      default: null,
    },
  },
  computed: {
    getDate() {
      return formattedDate(this.date)
    },
  },
}
</script>
