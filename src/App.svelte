<script>
  import { onMount } from "svelte";
  import { questions } from "./questions.js";

  let question = "";
  let options = [];
  let states = [];
  let answeredIndices = [];
  let randomIndex = getRandomIndex();
  let userAnswers = []; // Array to track user's answers
  let allQuestionsAnswered = false; // Boolean to track if all questions are answered

  const levelsOfConsciousness = [
    "Shame",
    "Guilt",
    "Apathy",
    "Grief",
    "Fear",
    "Desire",
    "Anger",
    "Pride",
    "Courage",
    "Neutrality",
    "Willingness",
    "Acceptance",
    "Reason",
    "Love",
    "Joy",
    "Peace",
  ];

  function getRandomIndex() {
    let availableIndices = questions
      .map((_, index) => index)
      .filter((index) => !answeredIndices.includes(index));
    return availableIndices[
      Math.floor(Math.random() * availableIndices.length)
    ];
  }

  function loadQuestion() {
    randomIndex = getRandomIndex();
    const selectedQuestion = questions[randomIndex];
    question = selectedQuestion.text;
    options = selectedQuestion.options;
  }

  onMount(() => {
    loadQuestion();
  });

  function handleClick(optionIndex) {
    states = [];
    const selectedOption = options[optionIndex];
    if (selectedOption.emotion) {
      states.push(selectedOption.emotion);
      userAnswers = [...userAnswers, selectedOption.emotion]; // Reassign to trigger reactivity
    }

    answeredIndices.push(randomIndex);
    if (answeredIndices.length < questions.length) {
      loadQuestion();
    } else {
      question = "No more questions available.";
      options = [];
      allQuestionsAnswered = true; // Set to true when all questions are answered
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
        <button class="option-button" on:click={() => handleClick(index)}
          >{option.text}</button
        >
      {/each}
    </div>
    {#if allQuestionsAnswered}
      <div class="levels">
        <ul>
          {#each levelsOfConsciousness.slice().reverse() as level}
            <li>
              <span
                style="color: {userAnswers.includes(level) ? 'black' : '#888'}"
              >
                {level}
              </span>

              <span>
                <!-- dot for each instance of it in userAnswers -->
                {#each userAnswers.filter((x) => x === level) as _}
                  &#8226;
                {/each}
              </span>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</main>

<style>
  .container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    backdrop-filter: blur(100px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .question {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: #333;
  }

  .options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .option-button {
    background-color: #6c757d;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 1rem;
    font-size: 1.1rem;
    cursor: pointer;
    transition:
      background-color 0.3s,
      transform 0.2s,
      box-shadow 0.3s;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .option-button:hover {
    background-color: #5a6268;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
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
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }

  .levels ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* flex-wrap: wrap; */
  }
  .levels ul li {
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }
  .levels ul li span {
    flex: 1;
    width: 20rem;
  }
  span:first-of-type {
    text-align: right;
    color: #555;
  }
  span:last-of-type {
    text-align: left;
    color: black;
    font-size: 2rem;
    line-height: 0.2;
  }
</style>
