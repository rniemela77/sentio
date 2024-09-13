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
  <div class="states">
    {#each states as state}
      <div>{state}</div>
    {/each}
  </div>
  <div class="question">{question}</div>
  {#each options as option, index}
    <button on:click={() => handleClick(index)}>{option.text}</button>
  {/each}
</main>

<style>
  .states {
    margin-bottom: 1em;
  }

  .question {
    margin-bottom: 1em;
  }

  button {
    margin: 0.5em;
  }
</style>
