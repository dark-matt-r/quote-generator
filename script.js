//A list of all the quotes needed.
// It will be populated from the Internet.
let apiQuotes = [];

// Get the elements from the HTML.
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show loading text.
function showLoadingText() {
  // Hide quote text and author.
  quoteContainer.style.display = "none";
  // Show loader.
  loader.style.display = "block";
}

// Hide loading text.
function hideLoadingText() {
  // Hide loader.
  loader.style.display = "none";
  // Show quote text and author.
  quoteContainer.style.display = "block";
}

function newQuote() {
  showLoadingText();
  let randomNumber = Math.floor(Math.random() * apiQuotes.length);
  let quote = apiQuotes[randomNumber];
  //Set quote.
  quoteText.textContent = quote.text;
  //Hide loading text.
  hideLoadingText();
  // Set author.
  authorText.textContent = quote.author;
  //Check if author field is blank and replace it with 'Unknown'.
  if (quote.author == "Anonymous") {
    authorText.textContent = "Unknown";
  }
}

// Fetch quotes from API and display a random quote.
// This function is asynchronous, meaning it will run in the background and not block the main thread.
async function getQuotes() {
  showLoadingText();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    // Fetch quotes from API.
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    console.log(newQuote());
    hideLoadingText();
    // Call newQuote to display a quote when the page loads.
    newQuote();
  } catch (error) {
    console.error("Error fetching quotes:", error);
  }
  hideLoadingText();
}

// https://twitter.com/intent/tweet
// https://x.com/intent/post
// Share quote on Twitter.You could replace this with the X URL above.
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event listeners.
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// Run the program.
getQuotes();
