import { ref } from 'vue';

export default function useCounter() {
  const count = ref(0);
  function handleCount() {
    count.value++;
  }

  return { count, handleCount };
}
