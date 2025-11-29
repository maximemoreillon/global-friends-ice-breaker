<script lang="ts">
  import { currentUser } from "$lib/firebase";
  import { collection, setDoc, getFirestore, doc } from "firebase/firestore";

  let loading = $state(false);
  let userData = $state({
    name: "",
    favoriteFood: "",
    hobby: "",
    country: "",
  });

  async function handleSumit() {
    if (!$currentUser) return;
    loading = true;
    try {
      const firestore = getFirestore();

      await setDoc(
        doc(firestore, "users", $currentUser.uid),
        { ...userData, points: 0 },
        {
          merge: true,
        }
      );
      alert("OK");
    } catch (error) {
      console.error(error);
      alert(error);
    } finally {
      loading = false;
    }
  }
</script>

<form on:submit|preventDefault={handleSumit}>
  <div>
    <label for="name">Name</label>
    <input
      id="name"
      type="text"
      bind:value={userData.name}
      class="border border-grey rounded"
    />
  </div>
  <div>
    <label for="name">Country</label>
    <input
      id="name"
      type="text"
      bind:value={userData.country}
      class="border border-grey rounded"
    />
  </div>
  <div>
    <label for="name">Favorite food</label>
    <input
      id="name"
      type="text"
      bind:value={userData.favoriteFood}
      class="border border-grey rounded"
    />
  </div>
  <div>
    <label for="name">Hobby</label>
    <input
      id="name"
      type="text"
      bind:value={userData.hobby}
      class="border border-grey rounded"
    />
  </div>
  <div>
    <input type="submit" class="border border-grey rounded" />
  </div>
</form>
