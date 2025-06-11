const MAX_TOKENS = 5;
const REFILL_RATE = 5000; // Milliseconds between token refills (5 seconds)

const bucket = {
    tokens: MAX_TOKENS,
    hasTokens: function () {
        return this.tokens > 0;
    },
    consumeToken: function () {
        if (this.hasTokens()) this.tokens -= 1;
    },
    releaseToken: function () {
        if (this.tokens < MAX_TOKENS) this.tokens += 1;
    }
};

function waitFor(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function handleIncomingRequest(requestId) {
    if (!bucket.hasTokens()) {
        console.log(`❌ [${requestId}] Out of tokens! Try later.`);
        return;
    }

    bucket.consumeToken();
    console.log(`✅ [${requestId}] Token consumed. Processing... (Tokens left: ${bucket.tokens})`);
    await waitFor(2000); // Simulated processing time
    console.log(`✅ [${requestId}] Done processing.`);
}

// Simulate a burst of incoming requests
async function simulateRequests() {
    let requestId = 1;
    setInterval(() => {
        handleIncomingRequest(`Request-${requestId++}`);
    }, 1000); // One request every second
}

// Token refiller
setInterval(() => {
    bucket.releaseToken();
    console.log(`🔁 Token refilled. Tokens available: ${bucket.tokens}`);
}, REFILL_RATE);

simulateRequests();
