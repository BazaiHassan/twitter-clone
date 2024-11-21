<template>
  <div>
    <MainSection title="Tweet" :loading="loading">
      <Head>
        <Title>Tweets / {{ tweet.author.name }}</Title>
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
const id = ref(null)
function getTweetIdFromRoute() {
  id.value =  useRoute().params.id;
  console.log(id.value)
}


async function getTweet() {
  loading.value = true;
  try {
    const response = await getTweetById(id.value);
    tweet.value = response.tweet;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

onBeforeMount(() => {
  getTweetIdFromRoute()
  getTweet()
});

watch(
  () => useRoute().fullPath,
  () => getTweet()
);
</script>
