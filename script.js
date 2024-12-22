// Admin Panel Logic
const answerForm = document.getElementById("answer-form");
const questionsContainer = document.getElementById("questions-container");

document.getElementById("add-question").addEventListener("click", () => {
  const questionDiv = document.createElement("div");
  questionDiv.classList.add("question");
  questionDiv.innerHTML = `
    <label>Question ${questionsContainer.children.length + 1}:</label>
    <input type="text" class="answer-input" placeholder="Enter correct answer (A/B/C/D)">
  `;
  questionsContainer.appendChild(questionDiv);
});

answerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const answers = Array.from(document.querySelectorAll(".answer-input")).map(input => input.value.trim());
  fetch("data/answers.json", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers }),
  }).then(() => alert("Answers saved!"));
});

// Evaluator Logic
document.getElementById("upload-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const file = document.getElementById("omr-scan").files[0];
  const formData = new FormData();
  formData.append("file", file);

  // Simulate OCR and evaluation (placeholder logic)
  fetch("data/answers.json")
    .then(response => response.json())
    .then(({ answers }) => {
      // Mock evaluation logic here
      const scannedAnswers = ["A", "B", "C", "D"]; // Replace with real OCR output
      let correct = 0;

      const results = scannedAnswers.map((ans, index) => {
        if (ans === answers[index]) correct++;
        return { question: index + 1, scanned: ans, correct: answers[index] };
      });

      document.getElementById("evaluation-result").innerHTML = `
        <h3>Evaluation Result</h3>
        <p>Correct: ${correct}</p>
        <p>Incorrect: ${answers.length - correct}</p>
        <pre>${JSON.stringify(results, null, 2)}</pre>
      `;
    });
});
