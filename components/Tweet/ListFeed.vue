<template>
  <div>
    <div v-if="isEmptyArray" class="p-4">
      <p class="text-center text-gray-500">There is no tweets yet! :(</p>
    </div>

    <div
      v-else
      v-for="tweet in props.tweets"
      :key="tweet.id"
      class="pb-4 border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300"
      :class="[twitterBorderColor, defaultTransition]"
      @click.prevent="redirect(tweet)"
    >
      <TweetItem :tweet="tweet" compact />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tweets: {
    type: Array,
    required: true,
  },
});

const { twitterBorderColor, defaultTransition } = useTailwindConfig();
const isEmptyArray = computed(() => props.tweets.length === 0);

function redirect(tweet) {
  navigateTo({
    path:`/status/${tweet.id}`
  })
}

</script>
