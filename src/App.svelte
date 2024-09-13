<script>
  import { onMount } from 'svelte';
  import { questions } from './questions.js';

  let question = '';
  let options = [];
  let states = [];
  let randomIndex = Math.floor(Math.random() * questions.length);

  onMount(() => {
    const selectedQuestion = questions[randomIndex];
    question = selectedQuestion.text;
    options = selectedQuestion.options;
  });

  function handleClick(optionIndex) {
    states = [];
    const selectedOption = options[optionIndex];
    if (selectedOption.emotion) {
      states.push(selectedOption.emotion);
    }
  }
</script>

<main>
  <div class="container">
    <div class="states">
      {#each states as state}
        <div class="state-item">{state}</div>
      {/each}
    </div>
    <div class="question">{question}</div>
    <div class="options">
      {#each options as option, index}
        <button class="option-button" on:click={() => handleClick(index)}>{option.text}</button>
      {/each}
    </div>
  </div>
</main>

<style>
.container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #ffffff; /* Clean and focused */
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); /* Subtle depth */
  text-align: center; /* Center alignment for focus */
}

.question {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333; /* High contrast for readability */
}

.options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.option-button {
  background-color: #6c757d; /* Neutral color */
  color: white;
  border: none;
  border-radius: 6px;
  padding: 1rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

.option-button:hover {
  background-color: #5a6268;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Enhanced shadow */
}

.option-button:active {
  transform: scale(0.98);
}

.states {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 1.5rem;
}

.state-item {
  background-color: #e9ecef;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  color: #333;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1); /* Subtle depth */
}
</style>
