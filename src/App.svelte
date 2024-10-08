<script>
  import { onMount, tick } from "svelte";
  import { questions } from "./questions.js";
  import { fade } from "svelte/transition";

  let question = "";
  let options = [];
  let states = [];
  let answeredIndices = [];
  let randomIndex = getRandomIndex();
  let userAnswers = []; // Array to track user's answers
  let allQuestionsAnswered = false; // Boolean to track if all questions are answered
  let showOptions = true; // Boolean to control the display of options

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

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  async function loadQuestion() {
    randomIndex = getRandomIndex();
    const selectedQuestion = questions[randomIndex];
    question = selectedQuestion.text;
    options = shuffleArray([...selectedQuestion.options]); // Shuffle options
    showOptions = true; // Show options after loading the new question
  }

  function skipToResults() {
    question = "Results";
    options = [];
    allQuestionsAnswered = true; // Set to true when all questions are skipped
  }

  onMount(() => {
    loadQuestion();
  });

  async function handleClick(optionIndex) {
    states = [];
    const selectedOption = options[optionIndex];
    if (selectedOption.emotion) {
      states.push(selectedOption.emotion);
      userAnswers = [...userAnswers, selectedOption.emotion]; // Reassign to trigger reactivity
    }

    answeredIndices = [...answeredIndices, randomIndex]; // Reassign to trigger reactivity
    showOptions = false; // Hide options to trigger fade-out transition
    await tick(); // Wait for the DOM to update

    if (answeredIndices.length < questions.length) {
      await new Promise((resolve) => setTimeout(resolve, 300)); // Wait for fade-out transition to complete
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
    <div class="number">
      <!-- 01/50 -->
      {answeredIndices.length + 1}/{questions.length}
    </div>
    <div class="question">{question}</div>
    {#if showOptions}
      <div
        class="options"
        in:fade={{ duration: 300 }}
        out:fade={{ duration: 300 }}
      >
        {#each options as option, index (option.text)}
          <button class="option-button" on:click={() => handleClick(index)}>
            {option.text}
          </button>
        {/each}
      </div>
    {/if}
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
    {#if !allQuestionsAnswered}
      <button class="skip-button" on:click={skipToResults}>Skip to Results</button>
    {/if}

    <!-- Take again button -->
    {#if allQuestionsAnswered}
      <button class="skip-button" on:click={() => window.location.reload()}>Take Again</button>
    {/if}
  </div>

  <!-- footer -->
  <footer>
    <p>
      Made by Robert Niemela | Email: <a href="mailto:rvniemela@hotmail.com">rvniemela@hotmail.com</a> | GitHub: <a href="https://github.com/rniemela77" target="_blank">https://github.com/rniemela77</a>
    </p>
  </footer>
</main>

<style>
  .container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    backdrop-filter: blur(100px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .question {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    min-height: 72px;
    padding: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  /* column on mobile */
  @media (max-width: 600px) {
    .options {
      grid-template-columns: 1fr;
    }
  }

  .option-button {
    background-color: #6c757d;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 1rem;
    font-size: 1.1rem;
    cursor: pointer;
    min-height: 72px;
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

  .levels ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .levels ul li {
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }
  .levels ul li span {
    flex: 1;
    min-width: 5rem;
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
  .number {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1rem;
    color: #5555558b;
  }

  .skip-button {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    padding: 0.7rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 2rem;
    transition:
      background-color 0.3s,
      transform 0.2s,
      box-shadow 0.3s;
      color: rgba(0, 0, 0, 0.5);
  }

  .skip-button:hover {
    border-color: rgba(0, 0, 0, 0.2);
    color: black;
    /* box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); */
  }

  .skip-button:active {
    transform: scale(0.98);
  }

  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    font-size: 0.7rem;
    padding: 0.2rem;
    background-color: rgba(255, 255, 255, 0.8);
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(100px);
    text-align: center;
    opacity:0.5;
  }
</style>
