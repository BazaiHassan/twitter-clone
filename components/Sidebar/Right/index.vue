<template>
  <div class="flex flex-col">
    <!-- Preview Card: What's happening? -->
    <SidebarRightPreviewCard title="What's happening?">
      <SidebarRightPreviewCardItem
        v-for="whatsHappening in whatsHappeningItems"
      >
        <div>
          <h2 class="font-bold text-gray-800 text-md dark:text-white">
            {{ whatsHappening.title }}
          </h2>
          <p class="text-xs text-gray-400">{{ whatsHappening.count }}</p>
        </div>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>

    <!-- Preview Card: Who to follow? -->
    <SidebarRightPreviewCard title="Who to follow?">
      <SidebarRightPreviewCardItem v-for="whoTofollow in whoToFollowItems">
        <div class="flex flex-row items-center justify-between p-2">

          <div class="flex flex-row">
            <img
              class="h-10 w-10 rounded-full"
              :src="whoTofollow.image"
              alt="avatar"
            />
            <div class="flex flex-col ml-2">
              <h1 class="text-sm font-bold text-gray-900 dark:text-white">
                {{ whoTofollow.name }}
              </h1>
              <p class="text-xs text-gray-400">{{ whoTofollow.handle }}</p>
            </div>
          </div>

          <div class="flex h-full">
            <button
              class="bg-black dark:bg-white rounded-full text-white dark:text-black px-4 py-2 text-sm font-bold"
            >
              Follow
            </button>
          </div>

        </div>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>
  </div>
</template>

<script setup>
const whatsHappeningItems = ref([
  {
    title: "HBazai",
    count: "10k Tweets",
  },
  {
    title: "#ArtForALL",
    count: "12k Tweets",
  },
  {
    title: "FEhsani",
    count: "18k Tweets",
  },
]);

const whoToFollowItems = ref([
  {
    name: "Joe Biden",
    handle: "@joebiden",
    image: "https://picsum.photos/200/200",
  },
  {
    name: "Donald Trump",
    handle: "@donaldtrump",
    image: "https://picsum.photos/100/300",
  },
]);
</script>
