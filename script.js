async function generateFunnyResponse() {
    let query = document.getElementById("searchQuery").value;
    let resultsDiv = document.getElementById("results");
    
    if (query.trim() === "") {
        resultsDiv.innerHTML = "<p style='color: red;'>Professor says: 'You want a plan? First, learn to type something!'</p>";
        return;
    }
    
    resultsDiv.innerHTML = "<p style='color: yellow;'>Professor is thinking... 🤔</p>";
    
    try {
        let response = await fetch("http://localhost:5000/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query: query })
        });
        
        let data = await response.json();
        resultsDiv.innerHTML = `<p>${data.response}</p>`;
    } catch (error) {
        resultsDiv.innerHTML = "<p style='color: red;'>Professor is taking a nap. Try again later! 😴</p>";
    }
}

function createMoney() {
    const money = document.createElement('img');
    money.src = "money.png";
    money.classList.add('money');
    money.style.left = `${Math.random() * 100}vw`;
    money.style.animationDuration = `${Math.random() * 3 + 2}s`; // Random fall speed

    document.body.appendChild(money);

    setTimeout(() => {
        money.remove();
    }, 5000);
}

setTimeout(() => {
    document.getElementById("mask-container").remove();
}, 3000); // Remove mask after 3 seconds

// Create falling money every 300ms
setInterval(createMoney, 200);