// console.log("Hello, World!");

let apiQuotes = [];

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show loading text.
function showLoadingText() {
  // loader.hidden = false;
  // quoteContainer.hidden = true;
  loader.style.display = "block";
  quoteContainer.style.display = "none";
}

// Hide loading text.
function hideLoadingText() {
  // if (!loader.hidden) {
  //   quoteContainer.hidden = false;
  //   loader.hidden = true;
  // }
  loader.style.display = "none";
  quoteContainer.style.display = "block";
}

// quoteContainer.textContent = "Hello, World!";
// loader.textContent = "jhg";
// console.log("Test");
// hideLoadingText();
// loader.hidden = true;
// loader.style.display = "none";

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

async function getQuotes() {
  // showLoadingText();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    console.log(newQuote());
    // hideLoadingText();
    newQuote();
  } catch (error) {
    console.error("Error fetching quotes:", error);
  }
  // hideLoadingText();
}

// https://twitter.com/intent/tweet
// https://x.com/intent/post
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
// showLoadingText();
// hideLoadingText();
console.log("Test");

// console.log(apiQuotes);
// newQuote();
