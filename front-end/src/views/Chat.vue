<template>
<div class="chat">
  <h1> Cougar Chat </h1>
  <p>Here is a safe place for fans to come together and share their love of BYU
  football. We would to drink with you in celebration of our victories, as well
  as cry with you over heartbreaking losses. Treading topics for this season has
  been Zach Wilson's tremendous performance this season, his draft prospect, BYU's
  current ranking, what a shame it is that covid hit this year, and our dream rending
  loss to Coastal Carolina this past week. Remember, this is a safe space, unless you
  root for the U.
  <section class="chat-gallery">
    <div class="chat" v-for="chat in chats" :key="chat.id">
      <h2>{{chat.author}}</h2>
      <p>{{chat.message}}</p>
    </div>
  </section>
  <div class="sendChat">
    <input v-model="title" placeholder="Author">
    <p></p>
    <input type="textarea" name="message">
    <button @click="postChat">Post</button>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'Chat',

  data() {
    return {
    title: "",
    addChat: null,
    chats: [],
    chatAuthor: "",
    chatMessage: "",
    }
  },

  created() {
    this.getChats();
  },

  methods: {
    async getChats() {
      try {
        let response = await axios.get("/api/chats");
        this.chats = response.data;
        return true;
      } catch (error) {
        return false;
      }
    },

    fileChanged(event) {
      this.file = event.target.files[0]
    },


    async upload() {
    try {
      const formData = new FormData();
      formData.append('photo', this.file, this.file.name)
      let r2 = await axios.post('/api/chats', {
        author: this.author,
        message: this.message
      });
      this.addChat = r2.data;
    } catch (error) {
      console.log(error);
    }
    },
  }
}






</script>

<style scoped>
.image h2 {
  font-style: italic;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1.5em;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  width: 100%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
