import crypto from "node:crypto";

//Built in node js module 
//Security related tasks.
//Creating random UUID,ID,
//hashing data
//To verify if the data was changed or not,
//Encryption and Decryption


// UUID 
// 1.crypto.randomUUID()
// Purpose
//Generates a unique UUID.
/*
Where to Use
✅ User IDs
✅ Order IDs
✅ Product IDs
✅ Chat Message IDs
✅ File Names
*/
const requestedID = crypto.randomUUID()
console.log(requestedID);

//output --d103c73a-25cb-4483-942c-a8a13d89ed29(32 bits)

//2.crypto.randomBytes(size)
/*
Purpose
Generates cryptographically secure random bytes.
Where to Use
✅ OTP generation
✅ API Keys
✅ Session IDs
✅ Password reset tokens
✅ CSRF tokens
✅ JWT secret generation
What it does:
Returns random data in the form of a Buffer.
Size is in bytes.
Why we use it:
API Secret keys
Encryption keys
Temporary passwords
One-time tokens
Salt for passwords
*/
const resetToken = crypto.randomBytes(16).toString('hex');
//if we give the hex it will give 32 character string 
console.log("This is the randomly generated Token for the Password reset", resetToken);

// output ->This is the randomly generated Token for the Password reset 13294c60cb355ab7d28583225a8a42ed

/*3.crypto.createHash()
Purpose
****Generates a one-way hash of data.
Original data cannot be recovered.
Where to Use
✅ Password hashing (with salt or key derivation functions)
✅ File integrity verification
✅ Blockchain block hashing
✅ Git commit hashes
✅ Data integrity checks
*/

const text = "Hello Hash";
const hash = crypto.createHash("sha256").update(text).digest("hex");
console.log("The Hashed Value of the text is", hash);

// OUTPUT -The Hashed Value of the text is 6529ead5a42d94dcf8416b9192a6ae25c1700c006b4ef71ea7b4a67b34532996

/*4.crypto.createHmac(algo,key)

Purpose
****Creates a Hash-based Message Authentication Code (HMAC).
crypto.createHmac()
Purpose
Creates a hash using a secret key.
Ensures data integrity and authenticity.
Where to Use
✅ JWT Signature
✅ Stripe Webhook Verification
✅ Razorpay Signature Verification
✅ API Authentication
✅ Secure Request Validation
*/

/* webhook?
A webhook is a way for one application to automatically notify 
another application when an event happens.
what it resolves like Polling.
polling actually means is "Your app keeps asking repeatedly".
Example -If a order is placed then your app will ask to the server again and again 
for the order status. 
This waste resources, bandwidth, and server CPU cycles.

Webhook is just a URL provided by our server. when you want to notify us,
we send the data to that URL and it will update the database.
DEF:
An HTTP callback (usually a POST request) sent automatically when a specific event occurs.
*/
/*example
Customer
     |
Makes Payment
     |
Razorpay
     |
Payment Success
     |
Webhook POST Request
     |
Your Backend
     |
Update Database
     |
Send Email
     |
Activate Subscription

*/

const secret = "My_secret_key_is_UV";
const message = "This is the message that I want to send to the server";
const signature = crypto.createHmac("sha256", secret).update(message).digest("hex")
console.log("The Hashed Signature is", signature);

// output -> The Hashed Value of the text is 1d62b985d1585b7336e128f65f0dd4436b44d5054e8b2df7679195d2c69b33f0

/*
A webhook is an HTTP callback where one application automatically sends a POST request to another application 
when a specific event occurs. Unlike a normal API, where the client requests data, a webhook pushes 
data automatically. Webhooks are commonly used for payment notifications, GitHub events, 
SMS delivery updates, and subscription events. To ensure security, webhook requests are 
usually verified using an HMAC signature generated with crypto.createHmac().
*/

/*
5. crypto.createCipheriv()
Purpose
Encrypts data.
Where to Use
✅ Encrypt bank details
✅ Encrypt Aadhaar numbers
✅ Encrypt chat messages
✅ Encrypt sensitive database fields
*/
/*
`crypto.createCipheriv()` is used to encrypt sensitive data using a symmetric encryption algorithm such as AES-256-CBC.
 We provide an algorithm, a secret key, and an initialization vector (IV) to produce 
 encrypted text that can be safely stored or transmitted.

`crypto.createDecipheriv()` is used to decrypt that encrypted text back to its original
 form using the same algorithm, key, and IV. In real-world applications, 
 these methods are used to protect bank details, Aadhaar numbers, medical records,
  and chat messages stored in databases or sent across networks.
*/

/*
❌ Bad

Database

Name    Account Number

Vamsi   1234567890123456
*/
const algorithm = "AES-256-CBC"
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv(algorithm, key, iv);
const message1 = "24556789012";
let encryptedText = cipher.update(message1, "utf8", "hex");
encryptedText += cipher.final("hex");

console.log("The Encrypted Message is:", encryptedText);


// Now Decryption side
const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decipherText = decipher.update(encryptedText, "hex", "utf8");
decipherText += decipher.final("utf8");
console.log("The Decrypted Message is:", decipherText);

//output->The Decrypted Message is: 24556789012


/*
Important crypto Methods in Node.js (Interview Revision)
Method	One-Line Description
createHash()	Generates a one-way hash of data for integrity checks and hashing.
randomBytes()	Generates cryptographically secure random bytes for tokens, OTPs, and API keys.
randomUUID()	Generates a unique UUID for users, orders, messages, etc.
createHmac()	Creates a hash using a secret key to verify data authenticity and integrity.
createCipheriv()	Encrypts data using an algorithm, secret key, and IV.
createDecipheriv()	Decrypts encrypted data back to its original form.
pbkdf2()	Securely hashes passwords using multiple iterations and a salt.
scrypt()	A memory-hard password hashing algorithm used for secure password storage.
generateKeyPair()	Generates public and private key pairs for encryption and digital signatures.
sign()	Creates a digital signature using a private key to prove authenticity.
verify()	Verifies a digital signature using the corresponding public key.
timingSafeEqual()	Securely compares two values to prevent timing attacks.
createSecretKey()	Creates a KeyObject from raw secret bytes for encryption or HMAC operations.
getHashes()	Returns the list of hashing algorithms supported by the current Node.js runtime.
*/