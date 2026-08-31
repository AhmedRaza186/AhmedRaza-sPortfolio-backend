const messages = [
  "Tell me about Ahmed's experience",
  "ahmed ka experience batao",
  "Ahmed ki internship kitne months ki thi?",
  "Where does Ahmed currently work?",
  "Ahmed ka LinkedIn do"
];

async function runTests() {
  for (const message of messages) {
    console.log(`\n\n--- Prompt: ${message} ---`);
    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      const data = await response.json();
      console.log(data.message);
    } catch (e) {
      console.error(e);
    }
  }
}

runTests();
