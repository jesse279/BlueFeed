
<template>
<div class="admin">
<h1>Log BYU's Game Results</h1>
<div class="heading">
  <div class="circle">1</div>
  <h2>Add an Score</h2>
</div>
<div class="add">
  <div class="form">
    <input v-model="team1" placeholder="team1">
    <p></p>
    <input v-model="team2" placeholder="team2">
    <p></p>
    <input v-model="score1" placeholder="score1">
    <p></p>
    <input v-model="score2" placeholder="score2">
    <p></p>

    <button @click="upload">Post</button>
  </div>
  <div class="upload" v-if="addScore">
    <h2>{{addScore.team1}}</h2>
    <h2>{{addScore.score1}}</h2>
    <h2>{{addScore.team2}}</h2>
    <h2>{{addScore.score2}}</h2>
  </div>
</div>    <div class="heading">
      <div class="circle">2</div>
      <h2>Edit/Delete an Score</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findTitle" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectScore(s)">{{s.team1}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findScore">
        <input v-model="findScore.team1">
        <p></p>
        <input v-model="findScore.team2">
      </div>
      <div class="actions" v-if="findScore">
        <button @click="deleteScore(findScore)">Delete</button>
        <button @click="editScore(findScore)">Edit</button>
      </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Admin',

  data() {
    return {
      title: "",
      file: null,
      addScore: null,
      scores: [],
      team1: "",
      team2: "",
      score1: 0,
      score2: 0,
    }
  },
  computed: {
    suggestions() {
      let scores = this.scores.filter(score => score.team1.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return scores.sort((a, b) => a.team1 > b.team1);
    },
  },
  created() {
    this.getScores();
  },

  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },


  async getScores() {
    try {
      let response = await axios.get("/api/scores");
      this.scores = response.data;
      return true;
    } catch (error) {
      console.log(error);
    }
  },

  async upload() {
    try {
      const formData = new FormData();
      formData.append('photo', this.file, this.file.name)
      let r2 = await axios.post('/api/scores', {
        team1: this.team1,
        team2: this.team1,
        score1: this.score1,
        score2: this.score2,
      });
      this.addScore = r2.data;
    } catch (error) {
      console.log(error);
    }
  },



  selectScore(score) {
    this.findTitle = "";
    this.findScore = score;
  },

  async deleteScore(score) {
    try {
      await axios.delete("/api/scores/" + score._id);
      this.findScore = null;
      this.getScores();
      return true;
    } catch (error) {
      console.log(error);
    }
  },
  async editScore(score) {
    try {
      await axios.put("/api/scores/" + score._id, {
        title: this.findScore.title,
      });
      this.findScore = null;
      this.getScores();
      return true;
    } catch (error) {
      console.log(error);
    }
  }
  },
}






</script>


<style scoped>
.logo {
max-height: 100%;
max-width: 100%;
}

.logo-contain {
  height: 100px;
  width: 100px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}
</style>
