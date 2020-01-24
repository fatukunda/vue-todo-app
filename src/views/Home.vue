<template>
  <div class="home">
    <AddTodos />
    <FilterTodos />
    <AppTodos />
  </div>
</template>

<script>
// @ is an alias to /src
import AppTodos from "@/components/AppTodos.vue";
import AddTodos from "@/components/AddTodos.vue";
import FilterTodos from "@/components/FilterTodos.vue";
export default {
  name: "home",
  components: {
    AppTodos,
    AddTodos,
    FilterTodos
  }
};
</script>
