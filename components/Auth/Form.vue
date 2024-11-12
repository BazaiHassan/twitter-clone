<template>
  <div>
    <div class="pt-5 space-y-6">
      <UIInput
        v-model="data.username"
        label="username"
        placeholder="@username"
        type="text"
      />
      <UIInput
        v-model="data.password"
        label="password"
        placeholder="********"
        type="password"
      />
      <div>
        <button
          class="border px-4 py-2 rounded-full w-full bg-dim-100 text-white"
          @click="handleLogin"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { login } = useAuth();

const data = reactive({
  username: "",
  password: "",
  loading: false,
});

async function handleLogin() {
  data.loading = true;
  try {
    await login({
      username: data.username,
      password: data.password,
    });
  } catch (error) {
    console.log(error);
  } finally {
    data.loading = false;
  }
}
</script>
