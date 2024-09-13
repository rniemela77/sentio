<script>
  import { onMount } from 'svelte';

  const levelsOfConsciousness = [
    "Acceptance", "Joy", "Fear", "Anger", "Grief", "Shame", "Willingness",
    "Love", "Pride", "Peace", "Courage", "Desire", "Neutrality", "Reason",
    "Guilt", "Apathy", "Enlightenment"
  ];

  const questions = [
    {
      text: "After an important meeting or conversation, do you typically...",
      options: [
        { text: "Move on quickly", emotion: "Acceptance" },
        { text: "Revisit what was said", emotion: "Guilt" }
      ]
    },
    {
      text: "When someone you care about is facing a problem, do you tend to...",
      options: [
        { text: "Offer practical advice", emotion: "Reason" },
        { text: "Feel strongly connected", emotion: "Grief" }
      ]
    },
    // Add more questions here
  ];

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
