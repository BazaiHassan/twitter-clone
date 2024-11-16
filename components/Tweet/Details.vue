<template>
    <div>
        <TweetItem :tweet="props.tweet" />
        <TweetForm :user="props.user" placeholder="Tweet your reply" />
        <TweetListFeed :tweets="replies" />
    </div>
</template>

<script setup>
const props = defineProps({
  tweet: {
    type: Object,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
});

const replies = computed(()=>props.tweet?.replies || [])
</script>
