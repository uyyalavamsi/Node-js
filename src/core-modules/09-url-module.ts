/*The url module is a built-in Node.js module used to parse, format, resolve, and manipulate URL strings (Uniform Resource Locators).

When building web applications or servers, you constantly need to read URL strings, extract routing paths, or query parameter values (e.g., getting "123" from /user?id=123). The url module makes this extremely easy and safe.

*/
// 1. Parsing a URL
const myUrl = new URL("https://example.org:8000/shop/search?category=shoes&size=10#results");

console.log("href for the url :", myUrl.href);
console.log("Protocol:", myUrl.protocol); // "https:"
console.log("Hostname:", myUrl.hostname); // "example.org"
console.log("Search:", myUrl.search); // "?category=shoes&size=10"
console.log("Hash:", myUrl.hash); // "#results" 
console.log("Port:", myUrl.port); // "8000"
console.log("Pathname:", myUrl.pathname); // "/shop/search"


// 2. Manipulating Query Parameters
const params = myUrl.searchParams;

console.log("Category is:", params.get("category")); // "shoes"
console.log("Has size?:", params.has("size")); // true

// Append a new query parameter
params.append("color", "red");
console.log("Updated URL:", myUrl.toString());
// "https://example.org:8000/shop/search?category=shoes&size=10&color=red#results"

// 3. Resolving URLs (like browsers do)
const baseUrl = "https://api.example.com/v1/";
const relativeUrl = "users?active=true";

// Combine them using URL.resolve (older Node versions) or construct a new URL
const resolvedUrl = new URL(relativeUrl, baseUrl);
console.log("Resolved URL:", resolvedUrl.href);
// "https://api.example.com/v1/users?active=true"

// 4. Getting and Setting Pagination Parameters (page and limit)
const apiURL = new URL("https://api.example.com/items?page=1&limit=10");

// Reading query params
const currentPage = apiURL.searchParams.get("page");
const currentLimit = apiURL.searchParams.get("limit");
console.log(`\nOriginal pagination -> Page: ${currentPage}, Limit: ${currentLimit}`);

// Modifying query params using set
apiURL.searchParams.set("page", "2");
apiURL.searchParams.set("limit", "20");

console.log("Updated pagination url:", apiURL.toString());
// Should print: https://api.example.com/items?page=2&limit=20

// 5. Creating standalone URLSearchParams
console.log("\n--- Standalone URLSearchParams ---");

// Method A: From a query string
const paramsFromString = new URLSearchParams("?search=laptop&sort=asc");
console.log("From String:", paramsFromString.toString()); // "search=laptop&sort=asc"

// Method B: From an Object (Very common for API requests)
const paramsFromObject = new URLSearchParams({
    category: "electronics",
    brand: "apple",
    stock: "true"
});
console.log("From Object:", paramsFromObject.toString()); // "category=electronics&brand=apple&stock=true"

// Method C: From an array of key-value pairs
const paramsFromArray = new URLSearchParams([
    ["tags", "node"],
    ["tags", "typescript"],
    ["active", "true"]
]);
console.log("From Array:", paramsFromArray.toString()); // "tags=node&tags=typescript&active=true"

// Interating over search parameters
console.log("\nLooping over parameters from object:");
paramsFromObject.forEach((value, key) => {
    console.log(`  ${key}: ${value}`);
});

// 6. Appending/Merging standalone URLSearchParams into a URL
console.log("\n--- Appending URLSearchParams to URL ---");
const mainUrl = new URL("https://example.com/search?q=javascript");
const additionalParams = new URLSearchParams({ page: "5", limit: "25" });

// Method A: Overwriting query parameters completely
const overwriteUrl = new URL(mainUrl.href);
overwriteUrl.search = additionalParams.toString();
console.log("Method A (Overwrite query params):", overwriteUrl.toString());

// Method B: Merging (appending) into existing query parameters
const mergeUrl = new URL(mainUrl.href);
additionalParams.forEach((value, key) => {
    mergeUrl.searchParams.set(key, value); // sets parameter, overwriting if existing
});
console.log("Method B (Merge query params):    ", mergeUrl.toString());




