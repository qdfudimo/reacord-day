<template>
  <div class="clander">
    <uni-calendar :selected="info.selected" :insert="true" :lunar="true" @change="change" />
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import uniCalendar from "@/uni_modules/uni-calendar/components/uni-calendar/uni-calendar";
const change = (e) => {
  console.log(e);
}

const info = reactive({
  selected: []
})
</script>

<style scoped lang="scss">
.clander {
  height: 100%;
}
</style>