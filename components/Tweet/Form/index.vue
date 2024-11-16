<template>
  <div>
    <div class="flex items-center justify-center py-6" v-if="loading">
      <UISpinner />
    </div>
    <div v-else>
      <TweetFormInput
        :placeholder="props.placeholder"
        :user="props.user"
        @onSubmit="handleFormSubmit"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  placeholder: {
    type: String,
    default: "What's happening?",
  },
});

const { postTweet } = useTweets();
const loading = ref(false);
async function handleFormSubmit(data) {
  loading.value = true;
  try {
    const response = await postTweet({
      text: data.text,
      mediaFiles: data.mediaFiles,
    });
    console.log("selected" + response);
  } catch (error) {
    console.log("here:" + error);
  } finally {
    loading.value = false;
  }
}
</script>
