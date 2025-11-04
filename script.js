// === Fonction Recherche ===
document.getElementById("searchBtn").addEventListener("click", async () => {
  const query = document.getElementById("searchInput").value.trim();
  const resultsDiv = document.getElementById("searchResults");
  if (!query) {
    resultsDiv.innerHTML = `<p class="text-warning">⚠️ Entrez un mot-clé.</p>`;
    return;
  }

  // Redirection vers Google
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  resultsDiv.innerHTML = `
    <p>Résultats pour <strong>${query}</strong> :</p>
    <a href="${searchUrl}" target="_blank" class="btn btn-sm btn-outline-info">Voir sur Google 🌐</a>
  `;
});

// === Fonction ChatGPT ===
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

// === Fonction pour obtenir une réponse de l'API OpenAI ===
async function getChatGPTResponse(prompt) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer TA_CLE_API_ICI" // <-- ⚠️ Mets ta clé ici
      },
      body: JSON.stringify({
        model: "gpt-5-turbo",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    if (data.error) {
      console.error(data.error);
      return "⚠️ Erreur de connexion à l'API.";
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error(error);
    return "⚠️ Erreur réseau.";
  }
}

// === Envoi de message ===
sendBtn.addEventListener("click", async () => {
  const message = chatInput.value.trim();
  if (!message) return;

  addMessage(message, "user");
  chatInput.value = "";
  addMessage("💭 GPT réfléchit...", "bot");

  const reply = await getChatGPTResponse(message);
  chatBox.lastChild.remove(); // Enlève le message "réfléchit..."
  addMessage(reply, "bot");
});

// === Envoi avec la touche Entrée ===
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});
