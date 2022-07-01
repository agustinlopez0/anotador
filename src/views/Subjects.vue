<template>
  <section class="home">

    <SubjectsCards/>

  </section>
</template>


<script>
import SubjectsCards from '@/components/subjects/SubjectsCards.vue'

export default {
  name: 'Subjects',
  components: {
    SubjectsCards
  }
}
</script>
