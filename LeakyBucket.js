const BUCKET_CAPACITY = 10; // Max requests the bucket can hold
const LEAK_RATE = 1000;     // Milliseconds between processing one request
const REQUEST_INTERVAL = 300; // Incoming request every 300ms
const SIMULATION_DURATION = 30000; // Run for 30 seconds

let leakyBucket = {
    requests: [],
    
    addRequest: function(requestId) {
        if (this.requests.length < BUCKET_CAPACITY) {
            this.requests.push(requestId);
            console.log(`📥 Request ${requestId} added. Bucket size: ${this.requests.length}`);
            return true;
        } else {
            console.log(`❌ Bucket full. Request ${requestId} dropped.`);
            return false;
        }
    },

    processRequest: function() {
        if (this.requests.length > 0) {
            const requestId = this.requests.shift();
            console.log(`✅ Processing Request ${requestId}. Bucket size: ${this.requests.length}`);
            return true;
        } else {
            console.log(`🕳️ No requests to process.`);
        }
        return false;
    }
};

// Simulate incoming requests
let requestId = 1;
const requestInterval = setInterval(() => {
    handleIncomingRequest(`R${requestId++}`);
}, REQUEST_INTERVAL);

function handleIncomingRequest(requestId) {
    if (!leakyBucket.addRequest(requestId)) {
        console.log(`⚠️ Request ${requestId} could not be processed. Try again later.`);
    }
}

// Leak (process) one request every LEAK_RATE ms
const leakInterval = setInterval(() => {
    leakyBucket.processRequest();
}, LEAK_RATE);

// Stop simulation after SIMULATION_DURATION
setTimeout(() => {
    clearInterval(requestInterval);
    console.log("\n⏹️ Stopped incoming request generation after 30 seconds.");
}, SIMULATION_DURATION);
