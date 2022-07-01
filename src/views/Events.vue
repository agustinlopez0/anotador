<template>
  <section class="home">

    <EventsCards/>

  </section>
</template>


<script>
import EventsCards from '@/components/events/EventsCards.vue'

export default {
  name: 'Events',
  components: {
    EventsCards
  }
}
</script>
