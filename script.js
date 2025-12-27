const quotes = [
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon", category: "Life" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney", category: "Success" },
    { text: "Your love is all I need to feel complete.", author: "Unknown", category: "Love" }
];

const container = document.getElementById('quote-container');

quotes.forEach(q => {
    const card = document.createElement('div');
    card.className = "p-6 bg-white rounded-lg shadow-md border-l-4 border-blue-500";
    card.innerHTML = `
        <span class="text-xs font-bold text-blue-400 uppercase">${q.category}</span>
        <p class="text-lg italic my-3">"${q.text}"</p>
        <p class="text-right font-bold">- ${q.author}</p>
        <button onclick="navigator.clipboard.writeText('${q.text}')" class="mt-4 text-sm text-blue-600 font-semibold hover:underline">
            Copy Quote
        </button>
    `;
    container.appendChild(card);
});
