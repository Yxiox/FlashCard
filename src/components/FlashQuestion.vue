<script>
import { onMounted, ref } from 'vue'

export default {
  props: {
    Nome: { type: String, required: true }
  },
  setup(props) {
    const randomNumber = ref(0)
    const jsonData = ref([])
    const selectedAnswer = ref(null)
    const isAnswered = ref(false)
    const isCorrect = ref(false)

    const nextQuestion = () => {
    let newIndex

  do {
    newIndex = Math.floor(Math.random() * jsonData.value.length)
  } while (newIndex === randomNumber.value)

  randomNumber.value = newIndex
  selectedAnswer.value = null
  isAnswered.value = false
}

    const answerClass = (key) => {
  if (!isAnswered.value) return ''

  const correct = jsonData.value[randomNumber.value].correct_answer

  if (key === correct) return 'correct'
  if (key === selectedAnswer.value) return 'wrong'

  return 'disabled'
}

    onMounted(async () => {
      randomNumber.value = Math.floor(Math.random() * 23)
      try {
        const response = await fetch(`/FlashCard/${props.Nome}.json`)
        jsonData.value = await response.json()
      } catch (error) {
        console.error('Failed to load JSON:', error)
      }
    })

    const selectAnswer = (answerKey) => {
      if (isAnswered.value) return

      selectedAnswer.value = answerKey
      isAnswered.value = true

      isCorrect.value =
        answerKey === jsonData.value[randomNumber.value].correct_answer

      if (isCorrect.value) {
        launchConfetti()
      }
    }

    const launchConfetti = async () => {
      const confetti = (await import('canvas-confetti')).default
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      })
    }

return {
  randomNumber,
  jsonData,
  selectedAnswer,
  isAnswered,
  selectAnswer,
  answerClass,
  nextQuestion
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
  <button
    @click="selectAnswer('answer_a')"
    :class="answerClass('answer_a')"
  >
    {{ jsonData[randomNumber].answer_a }}
  </button>

  <button
    @click="selectAnswer('answer_b')"
    :class="answerClass('answer_b')"
  >
    {{ jsonData[randomNumber].answer_b }}
  </button>

  <button
    @click="selectAnswer('answer_c')"
    :class="answerClass('answer_c')"
  >
    {{ jsonData[randomNumber].answer_c }}
  </button>

  <button
    @click="selectAnswer('answer_d')"
    :class="answerClass('answer_d')"
  >
    {{ jsonData[randomNumber].answer_d }}
  </button>
</div>
<div v-if="isAnswered" id="next-question">
  <button @click="nextQuestion">
    Próxima pergunta
  </button>
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
    min-height: 100dvh;
    width: 100%;
    overflow-x: hidden;
    padding-left: 15px;
    padding-right: 15px;
  }

#header h2{
    border: 1px rgb(147, 255, 192) solid;
    border-radius: 1rem;
    padding: 0.3rem 0.9rem;
    color: rgb(147, 255, 192);
    font-size: 2rem;
}

#body {
  width: 100%;
  max-width: 900px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

#question {
  text-align: center;
  padding: 0.5rem;
}

#question h3 {
  font-size: clamp(1rem, 4vw, 1.3rem);
}

#answers {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;
  z-index: 1;
}


@media (min-width: 640px) {
  #answers {
    grid-template-columns: 1fr 1fr;
  }
}

#answers button {
  color: white;
  border: 1px solid white;
  border-radius: 8px;
  background-color: rgb(94, 94, 94);
  padding: 1rem;
  min-height: 4.5rem;
  font-size: 1rem;
  width: 100%;
  text-align: center;
  word-break: break-word;
  touch-action: manipulation;
}

#answers button:hover{
    background-color: rgb(160, 160, 160);
    cursor: pointer;
}

#answers button:active{
    background-color: rgb(94, 94, 94);
}

.correct {
  border: 2px solid #2ecc71 !important;
  color: #2ecc71;
  background-color: rgba(46, 204, 113, 0.15);
}

.wrong {
  border: 2px solid #e74c3c !important;
  color: #e74c3c;
  background-color: rgba(231, 76, 60, 0.15);
}

.disabled {
  z-index: 1;
  opacity: 0.6;
}

#next-question {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

#next-question button {
  padding: 0.8rem 1.5rem;
  font-size: 1.2rem;
  border-radius: 8px;
  border: none;
  background-color: rgb(147, 255, 192);
  color: black;
  font-weight: bold;
  cursor: pointer;
}

#next-question button:hover {
  background-color: rgb(120, 230, 170);
}


</style>