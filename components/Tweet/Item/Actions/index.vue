<template>
  <div class="flex items-center justify-around">
    <!-- Action 1 -->
    <TweetItemActionsIcon color="blue">
      <template v-slot:icon="{ classes }">
        <ChatBubbleLeftEllipsisIcon :class="classes" />
      </template>
      <template v-slot:default>{{ props.tweet.repliesCount }}</template>
    </TweetItemActionsIcon>

    <!-- Action 2 -->
    <TweetItemActionsIcon color="green">
      <template v-slot:icon="{ classes }">
        <ArrowPathRoundedSquareIcon :class="classes" />
      </template>
      <template v-slot:default>{{ generateRandomNumber() }}</template>
    </TweetItemActionsIcon>

    <!-- Action 3 -->
    <TweetItemActionsIcon color="red">
      <template v-slot:icon="{ classes }">
        <HeartIcon :class="classes" />
      </template>
      <template v-slot:default>{{ generateRandomNumber() }}</template>
    </TweetItemActionsIcon>

    <!-- Action 4 -->
    <TweetItemActionsIcon color="blue">
      <template v-slot:icon="{ classes }">
        <ArrowUpTrayIcon :class="classes" />
      </template>
      <template v-slot:default>{{ generateRandomNumber() }}</template>
    </TweetItemActionsIcon>
  </div>
</template>

<script setup>
import {
  ChatBubbleLeftEllipsisIcon,
  ArrowPathRoundedSquareIcon,
  HeartIcon,
  ArrowUpTrayIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps({
  tweet:{
    type:Object,
    required:true
  }
})

function generateRandomNumber() {
  return Math.floor(Math.random()*100)
}
</script>
