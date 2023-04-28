<template>
  <div class="card">
    <img :src="getImage(experience.image)" :alt="experience.slug" />
    <div class="card__text">
      <h3>{{ experience.name }}</h3>
    </div>
  </div>
</template>
<script>
export default {
  name: "ExperienceCard",
  props: ["experience"],
  methods: {
    getImage(picture) {
      return require(`../assets/images/${picture}`);
    },
  },
};
</script>
