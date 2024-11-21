<template>
  <div>

    <TweetItemHeader :tweet="props.tweet" />

    <div :class="tweetBodyWrapper">
      <p :class="textSize" class="flex-shrink w-auto font-medium text-gray-800 dark:text-white">
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

    <TweetItemActions :tweet="props.tweet" :compact="props.compact" />
  </div>
</template>

<script setup>
const props = defineProps({
  tweet: {
    type: Object,
    required: true,
  },
  compact:{
    type:Boolean,
    default:false
  }
});
const {twitterBorderColor} = useTailwindConfig()
const tweetBodyWrapper = computed(()=>props.compact ? 'ml-16' : 'ml-2 mt-4')
const textSize = computed(()=>props.compact ? 'text-base':'text-xl')
</script>
