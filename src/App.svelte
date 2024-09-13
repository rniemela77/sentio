<script>
  import { onMount } from 'svelte';

  let states = [];
  const levelsOfConsciousness = [
    "Acceptance",
    "Joy",
    "Fear",
    "Anger",
    "Grief",
    "Shame",
    "Willingness",
    "Love",
    "Pride",
    "Peace",
    "Courage",
    "Desire",
    "Neutrality",
    "Reason",
    "Guilt",
    "Apathy",
    "Enlightenment"
  ];

  const questions = [
    {
      text:
        "After an important meeting or conversation, do you typically move on quickly, or do you find yourself revisiting what was said?",
      shame: 0,
      guilt: 1
    },
    {
      text:
        "When someone you care about is facing a problem, do you tend to offer practical advice, or do you often feel strongly connected to their emotions?",
      apathy: 0,
      grief: 1
    },
    {
      text:
        "When you think about taking on a new challenge, do you consider the practical obstacles first, or do you focus more on the excitement of the opportunity?",
      fear: 0,
      desire: 1
    },
    {
      text:
        "When working toward a long-term goal, do you generally enjoy adapting as you go, or do you prefer to see steady progress unfold as expected?",
      desire: 0,
      anger: 1
    },
  ];

  let question = '';
  let randomIndex = Math.floor(Math.random() * questions.length);

  onMount(() => {
    question = questions[randomIndex].text;
  });

  function handleClick(option) {
    states = [];

    levelsOfConsciousness.forEach((lvl) => {
      if (questions[randomIndex][lvl.toLowerCase()] === option) {
        states.push(lvl);
      }
    });
  }
</script>

<main>
  <div class="states">
    {#each states as state}
      <div>{state}</div>
    {/each}
  </div>
  <div class="question">{question}</div>
  <button on:click={() => handleClick(0)}>Option 1</button>
  <button on:click={() => handleClick(1)}>Option 2</button>
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
