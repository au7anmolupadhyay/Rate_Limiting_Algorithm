const WINDOW_SIZE = 5000; // 5 seconds
const MAX_REQUESTS = 5;

let fixedWindow = {
    requestCount: 0,
    windowStart: Date.now()
};

function handleFixedWindowRequest(requestId) {
    const now = Date.now();

    if (now - fixedWindow.windowStart > WINDOW_SIZE) {
        fixedWindow.windowStart = now;
        fixedWindow.requestCount = 0;
    }

    if (fixedWindow.requestCount < MAX_REQUESTS) {
        fixedWindow.requestCount++;
        console.log(`✅ [${requestId}] Allowed. Count: ${fixedWindow.requestCount}`);
    } else {
        console.log(`❌ [${requestId}] Rate limit exceeded.`);
    }
}

function simulateRequests() {
    let requestId = 1;
    setInterval(() => {
        handleFixedWindowRequest(`Fixed-${requestId++}`);
    }, 1000); // One request per second
}

simulateRequests();
