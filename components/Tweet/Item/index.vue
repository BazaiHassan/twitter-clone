<template>
  <div>

    <TweetItemHeader :tweet="props.tweet" />

    <div class="ml-16">
      <p class="flex-shrink w-auto font-medium text-gray-800 dark:text-white">
        {{ props.tweet.text }}
      </p>

      <div
        v-for="image in tweet.mediaFiles"
        :key="image.id"
        class="flex my-3 mr-2 border-2 rounded-2xl"
        :class="twitterBorderColor"
      >
        <img :src="image.url" class="rounded-2xl w-full" />
      </div>
    </div>

    <TweetItemActions :tweet="props.tweet" />
  </div>
</template>

<script setup>
const props = defineProps({
  tweet: {
    type: Object,
    required: true,
  },
});
const {twitterBorderColor} = useTailwindConfig()
</script>
