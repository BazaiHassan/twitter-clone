<template>
  <div class="flex items-center justify-around">
    <!-- Action 1 -->
    <TweetItemActionsIcon :size="size" color="blue">
      <template v-slot:icon="{ classes }">
        <ChatBubbleLeftEllipsisIcon :class="classes" />
      </template>
      <template v-slot:default>
        <span v-if="showStats">
          {{ props.tweet.repliesCount }}
        </span>
        </template>
    </TweetItemActionsIcon>

    <!-- Action 2 -->
    <TweetItemActionsIcon :size="size" color="green">
      <template v-slot:icon="{ classes }">
        <ArrowPathRoundedSquareIcon :class="classes" />
      </template>
      <template v-slot:default>
        <span v-if="showStats">
          {{ generateRandomNumber() }}
        </span>
      </template>
    </TweetItemActionsIcon>

    <!-- Action 3 -->
    <TweetItemActionsIcon :size="size" color="red">
      <template v-slot:icon="{ classes }">
        <HeartIcon :class="classes" />
      </template>
      <template v-slot:default>
        <span v-if="showStats">
          {{ generateRandomNumber() }}
        </span>
      </template>
    </TweetItemActionsIcon>

    <!-- Action 4 -->
    <TweetItemActionsIcon :size="size" color="blue">
      <template v-slot:icon="{ classes }">
        <ArrowUpTrayIcon :class="classes" />
      </template>
      <template v-slot:default>
        <span v-if="showStats">
          {{ generateRandomNumber() }}
        </span>
      </template>
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
  },
  compact:{
    type:Boolean,
    default:false
  }
})

function generateRandomNumber() {
  return Math.floor(Math.random()*100)
}

const showStats = computed(()=> props.compact)
const size = computed(()=> props.compact ? '5' : '8')
</script>
