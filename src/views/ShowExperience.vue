<template>
  <div class="experience-details">
    <h2>{{ experience.name }}</h2>
    <img :src="this.getPicture(experience.image)" :alt="experience.slug" />
    <p class="card__text">{{ experience.description }}</p>
  </div>
</template>
<script>
import sourceData from "@/data.json";
export default {
  name: "ShowExperience",
  props: ["id", "params"],
  data() {
    return {};
  },
  computed: {
    destination() {
      return sourceData.destinations.find(
        (destination) => destination.id === this.id
      );
    },
    experiences() {
      return this.destination.experiences;
    },
    experience() {
      return this.experiences.find(
        (experience) => experience.slug === this.params.experienceSlug
      );
    },
  },
  methods: {
    getPicture(pic) {
      return require(`../assets/images/${pic}`);
    },
  },
};
</script>
