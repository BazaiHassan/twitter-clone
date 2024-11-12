<template>
  <div>
    <TweetFormInput :user="props.user" @onSubmit="handleFormSubmit" />
  </div>
</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const { postTweet } = useTweets();


async function handleFormSubmit(data) {
  try {
    const response = await postTweet(data)
    console.log(response)
  } catch (error) {
    console.log("here:"+error)
  }
}
</script>
