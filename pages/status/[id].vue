<template>
  <div>
    <MainSection title="Tweet" :loading="loading">
      <Head>
        <Title></Title>
      </Head>
      <TweetDetails :tweet="tweet" :user="user" />
    </MainSection>
  </div>
</template>

<script setup>
const loading = ref(false);

const { getTweetById } = useTweets();
const { useAuthUser } = useAuth();

const tweet = ref(null);
const user = useAuthUser();

function getTweetIdFromRoute() {
  return useRoute().params.id;
}

watch(
  () => useRoute().fullPath,
  () => getTweet()
);

async function getTweet() {
  loading.value = true;
  try {
    const response = await getTweetById(getTweetIdFromRoute());
    tweet.value = response.tweet;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

onBeforeMount(() => {
  getTweet();
});
</script>
