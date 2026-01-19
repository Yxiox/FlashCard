<script>
  import { onMounted, ref, computed } from "vue";
  import confetti from "canvas-confetti";

  export default {
    props: {
      Nome: { type: String, required: true },
    },
    setup(props) {
      const progressPercent = computed(() => {
        if (jsonData.value.length === 0) return 0;
        return ((currentIndex.value + 1) / jsonData.value.length) * 100;
      });
      const currentIndex = ref(0);
      const jsonData = ref([]);

      const selectedAnswer = ref(null);
      const isAnswered = ref(false);
      const hasEnded = ref(false);
      const isCorrect = ref(false);

      onMounted(async () => {
        try {
          const response = await fetch(`/FlashCard/${props.Nome}.json`);
          jsonData.value = await response.json();
          currentIndex.value = 0;
        } catch (error) {
          console.error("Failed to load JSON:", error);
        }
      });

      const selectAnswer = (answerKey) => {
        if (isAnswered.value) return;

        selectedAnswer.value = answerKey;
        isAnswered.value = true;

        isCorrect.value =
          answerKey === jsonData.value[currentIndex.value].correct_answer;

        if (isCorrect.value) {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
          });
        }

        if (currentIndex.value === jsonData.value.length - 1) {
          hasEnded.value = true;
        }
      };

      const answerClass = (key) => {
        if (!isAnswered.value) return "";

        const correct = jsonData.value[currentIndex.value].correct_answer;

        if (key === correct) return "correct";
        if (key === selectedAnswer.value) return "wrong";

        return "disabled";
      };

      const nextQuestion = () => {
        if (currentIndex.value < jsonData.value.length - 1) {
          currentIndex.value++;
          selectedAnswer.value = null;
          isAnswered.value = false;
          isCorrect.value = false;
        }
      };

      return {
        jsonData,
        currentIndex,
        isAnswered,
        hasEnded,
        selectAnswer,
        answerClass,
        nextQuestion,
        progressPercent,
      };
    },
  };
</script>

<template>
  <div id="main-content" v-if="jsonData.length > 0">
    <div id="header">
      <h2>{{ Nome }}</h2>
    </div>
    <div id="body">
      <div id="progress-container">
        <div id="progress-bar" :style="{ width: progressPercent + '%' }"></div>
      </div>

      <div id="progress-text">
        {{ currentIndex + 1 }} / {{ jsonData.length }}
      </div>

      <div id="question">
        <h3>
          {{ jsonData[currentIndex].title }}
        </h3>
      </div>
      <div id="answers">
        <button
          @click="selectAnswer('answer_a')"
          :class="answerClass('answer_a')"
        >
          {{ jsonData[currentIndex].answer_a }}
        </button>

        <button
          @click="selectAnswer('answer_b')"
          :class="answerClass('answer_b')"
        >
          {{ jsonData[currentIndex].answer_b }}
        </button>

        <button
          @click="selectAnswer('answer_c')"
          :class="answerClass('answer_c')"
        >
          {{ jsonData[currentIndex].answer_c }}
        </button>

        <button
          @click="selectAnswer('answer_d')"
          :class="answerClass('answer_d')"
        >
          {{ jsonData[currentIndex].answer_d }}
        </button>
      </div>
      <div v-if="isAnswered && !hasEnded" id="next-question">
        <button @click="nextQuestion">Próxima pergunta</button>
      </div>
      <div v-if="isAnswered && hasEnded" id="next-question">
        <button>FIM!</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  #main-content {
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

  #header h2 {
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

  #answers button:hover {
    background-color: rgb(160, 160, 160);
    cursor: pointer;
  }

  #answers button:active {
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
  #progress-container {
    width: 100%;
    height: 10px;
    background-color: #444;
    border-radius: 6px;
    overflow: hidden;
    margin: 1rem 0;
  }

  #progress-bar {
    height: 100%;
    background-color: rgb(147, 255, 192);
    transition: width 0.3s ease;
  }

  #progress-text {
    text-align: center;
    font-size: 0.9rem;
    opacity: 0.8;
    margin-bottom: 1rem;
  }
</style>
