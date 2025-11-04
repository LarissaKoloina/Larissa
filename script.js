// === Recherche ===
document.getElementById("searchBtn").addEventListener("click", async () => {
  const query = document.getElementById("searchInput").value.trim();
  const resultsDiv = document.getElementById("searchResults");
  if (!query) {
    resultsDiv.innerHTML = `<p class="text-warning">⚠️ Entrez un mot-clé.</p>`;
    return;
  }

  // Exemple : rediriger vers une recherche Google
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  resultsDiv.innerHTML = `
    <p>Résultats pour <strong>${query}</strong> :</p>
    <a href="${searchUrl}" target="_blank" class="btn btn-sm btn-outline-info">Voir sur Google 🌐</a>
  `;
});

// === ChatGPT Simulation ===
const chatBox = document.getElementById("chatBox");
const sendBtn = document.getElementById("sendBtn");
const chatInput = document.getElementById("chatInput");

// Fonction pour ajouter un message
function addMessage(message, sender = "bot") {
  const div = document.createElement("div");
  div.classList.add("chat-message", sender === "user" ? "user-msg ms-auto" : "bot-msg");
  div.innerHTML = message;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Simulation locale
sendBtn.addEventListener("click", async () => {
  const message = chatInput.value.trim();
  if (!message) return;
  addMessage(message, "user");
  chatInput.value = "";

  // Réponse simulée (tu peux ici appeler l'API OpenAI)
  addMessage("🤖 Je réfléchis...");
  setTimeout(() => {
    chatBox.lastChild.remove();
    addMessage(`Voici une réponse simulée pour : <em>${message}</em> 😄`, "bot");
  }, 1000);
});

// Entrée avec "Enter"
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});
