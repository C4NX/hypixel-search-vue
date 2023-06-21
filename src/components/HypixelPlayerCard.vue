<script>
import {defineComponent} from 'vue'
import axios from "axios";

export default defineComponent({
  name: "HypixelPlayerCard",
  data: () => ({
    player: null,
    error: null,
    hasHypixelAccount: false
  }),
  props: {
    username: {
      type: String,
      required: false
    }
  },
  methods: {
    async getPlayer(fetchUsername) {
      this.player = null
      this.error = null
      this.hasHypixelAccount = true

      try {
        const mojangUuidData = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${fetchUsername ?? "Notch"}`)
        const hypixelPlayerData = (await axios.get(`https://api.hypixel.net/player?key=${import.meta.env.VITE_VUE_APP_HYPIXEL_API_KEY}&uuid=${mojangUuidData.data.id}`)).data.player
        this.player = hypixelPlayerData
        this.hasHypixelAccount = hypixelPlayerData !== null
      }catch (e) {
        if(e.isAxiosError){
          const errorMessage = e.response?.data?.errorMessage
          this.error = errorMessage ?? e
        }else{
          this.error = e
        }
        console.error(e)
      }
    }
  },
  mounted() {
    this.getPlayer()
  },
  watch: {
    username(next) {
      console.log(next)
      this.getPlayer(next)
    }
  }
})
</script>

<template>
  <div v-if="error">
    <p>{{ error }}</p>
  </div>
  <div v-if="!hasHypixelAccount">
    <p>Le joueur n'a pas de compte Hypixel</p>
  </div>
  <div v-if="player" class="card">
    <h2>
      {{ player.displayname }}
      <span v-if="player?.rank" class="rank">({{ player.rank }})</span>
    </h2>
    <img :src="`https://crafatar.com/renders/body/${player.uuid}`" alt="Player skin">
    <table class="table">
      <thead>
        <tr>
          <th>Karma</th>
          <th>Expérience</th>
          <th>Première connexion</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ player.karma }}</td>
          <td>{{ player.networkExp }}</td>
          <td>{{ new Date(player.firstLogin).toLocaleString('fr') }}</td>
        </tr>
      </tbody>
    </table>
    <table>
      <thead>
        <tr>
          <th>Jeu</th>
          <th>Données</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in player.stats" :key="key">
          <td>{{ key }}</td>
          <td>
            <json-viewer boxed copiable sort :value="value"/>
          </td>
        </tr>
      </tbody>
    </table>
    <p>{{ player.uuid }}</p>
  </div>
  <p v-if="!player && !error && hasHypixelAccount">Loading...</p>
</template>

<style scoped>
  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: left;
    gap: 20px;
  }

  .table {
    border-collapse: collapse;
  }

  .table th, .table td {
    padding: 5px;
  }

  .rank {
    color: #ffaa00;
  }
</style>