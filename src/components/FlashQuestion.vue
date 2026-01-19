<script >
    import { onMounted } from 'vue';
    import { ref } from 'vue'

    const randomNumber = ref(0)
    const jsonData = ref([])

    export default{
    props:{
        Nome:{ type:String, required:true }
    },
    setup(props) {
    onMounted(async () => {
      randomNumber.value = Math.floor(Math.random() * 23) 
      try {
        const response = await fetch(`/${props.Nome}.json`); 
        jsonData.value = await response.json();
        console.log('Loaded JSON:', jsonData);
      } catch (error) {
        console.error('Failed to load JSON:', error);
      }
    });

    return {
      randomNumber,
      jsonData
    }
  }
}
</script>

<template>
    <div id="main-content" v-if="jsonData.length > 0">
        <div id="header">
            <h2>{{Nome}}</h2>
        </div>
        <div id="body">
            <div id="question">
               <h3>
                {{ jsonData[randomNumber].title }}
               </h3> 
            </div>
            <div id="answers">
                <button>{{ jsonData[randomNumber].answer_a }}</button>
                <button>{{ jsonData[randomNumber].answer_b }}</button>
                <button>{{ jsonData[randomNumber].answer_c }}</button>
                <button>{{ jsonData[randomNumber].answer_d }}</button>
            </div>
        </div>
    </div>
</template>

<style scoped>

#main-content{
    background-color: rgb(59, 59, 59);
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 5px;
    font-size: 1.2rem;
}

#header h2{
    border: 1px rgb(147, 255, 192) solid;
    border-radius: 1rem;
    padding: 0.3rem 0.9rem;
    color: rgb(147, 255, 192);
    font-size: 2rem;
}

#body{
    height: 80vh;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

#question{
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: justify;
    padding: 0.3rem 0.9rem;
}

#answers{
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 1rem 1rem;
    gap: 1rem;
    margin-left: 10vw;
    margin-right: 10vw;
}

#answers button{
    color: white;
    border: 1px white solid;
    border-radius: 5px;
    background-color: rgb(94, 94, 94);
    margin: 4px 4px;
    min-height: 6rem;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    width: 100%;
    height: 100%;
}

#answers button:hover{
    background-color: rgb(160, 160, 160);
    cursor: pointer;
}

#answers button:active{
    background-color: rgb(94, 94, 94);
}

</style>