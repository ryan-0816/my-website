<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RIT Ski Team - Contact Us</title>
    <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
    <style>
        body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            margin: 0;
            padding: 20px;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .contact-container {
            max-width: 450px;
            margin: auto;
            padding: 2.5rem;
            background: #fff;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.2rem;
            text-align: center;
        }

        h1 {
            color: #2c3e50;
            margin: 0 0 0.5rem 0;
            font-size: 1.8rem;
        }

        .social-container {
            display: flex;
            justify-content: center;
            gap: 1.8rem;
            margin: 0.5rem 0 1rem 0;
        }

        .social-logo {
            height: 42px;
            width: 42px;
            transition: all 0.3s ease;
            border-radius: 50%;
            padding: 8px;
            background: #f8f9fa;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .social-logo:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        }

        .instagram-logo:hover {
            background: #fdf4f7;
        }

        .campusgroups-logo:hover {
            background: #f0f8ff;
        }

        .discord-logo:hover {
            background: #f0f4ff;
        }

        input, textarea {
            padding: 0.9rem;
            border-radius: 10px;
            border: 1px solid #ddd;
            font-size: 1rem;
            width: 85%;
            display: block;
            transition: border 0.3s ease;
        }

        input:focus, textarea:focus {
            outline: none;
            border-color: #1a73e8;
            box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
        }

        textarea {
            resize: none;
            height: 110px;
        }

        button {
            background: #1a73e8;
            color: white;
            padding: 0.9rem;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 600;
            transition: all 0.2s;
            width: 85%;
            margin-top: 0.5rem;
        }

        button:disabled {
            background: #a0aec0;
            cursor: not-allowed;
            transform: none;
        }

        button:hover:not(:disabled) {
            background: #155ab6;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(26, 115, 232, 0.3);
        }

        .status {
            text-align: center;
            font-weight: 500;
            min-height: 24px;
            margin: 0.5rem 0 0 0;
        }

        .subheading {
            color: #4a5568;
            margin: 0.5rem 0 1rem 0;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <div class="contact-container">
        <h1>Connect with us!</h1>
        
        <div class="social-container">
            <!-- Instagram -->
            <a href="https://www.instagram.com/officialritskiteam/"
               target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <img src="/insta.jpg" alt="Instagram logo" class="social-logo instagram-logo" />
            </a>
            
            <!-- CampusGroups -->
            <a href="https://campusgroups.rit.edu/AlpineSki"
               target="_blank" rel="noopener noreferrer" aria-label="CampusGroups">
                <img src="/campusgroups.png" alt="CampusGroups logo" class="social-logo campusgroups-logo" />
            </a>
            
            <!-- Discord -->
            <a href="https://discord.gg/HHuBQTKDwQ"
               target="_blank" rel="noopener noreferrer" aria-label="Discord">
                <img src="/discordlogo.jpg" alt="Discord logo" class="social-logo discord-logo" />
            </a>
        </div>

        <p class="subheading">📧 Feel free to reach out here!</p>
        
        <input type="text" placeholder="Name (optional)" id="name" />
        <input type="email" placeholder="Contact (optional)" id="email" />
        <textarea placeholder="Your message..." id="message"></textarea>
        
        <button id="send-button">Send! ➤📤📨⌯⌲</button>
        
        <p class="status" id="status"></p>
    </div>

    <script>
        // Initialize EmailJS
        (function() {
            emailjs.init("Rck1sjqBH0dNeF-aW");
        })();

        // Get DOM elements
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const sendButton = document.getElementById('send-button');
        const statusEl = document.getElementById('status');

        // Email configuration
        const SERVICE_ID = 'service_jkq5b3u';
        const TEMPLATE_ID = 'template_i9ke89m';
        const COOLDOWN_MS = 60000; // 60 seconds between sends

        let lastSendTime = 0;
        let isSending = false;

        // Send email function
        const sendEmail = async () => {
            const now = Date.now();
            if (now - lastSendTime < COOLDOWN_MS) {
                statusEl.textContent = `⏳ Please wait a few seconds before sending again.`;
                return;
            }

            const message = messageInput.value.trim();
            if (!message) {
                statusEl.textContent = "Please write your message.";
                return;
            }

            isSending = true;
            sendButton.disabled = true;
            sendButton.textContent = "Sending...";
            statusEl.textContent = "📨 Sending...";

            try {
                await emailjs.send(
                    SERVICE_ID,
                    TEMPLATE_ID,
                    { 
                        from_name: nameInput.value.trim() || "Anonymous", 
                        from_email: emailInput.value.trim() || "no-email-provided", 
                        message: message 
                    }
                );
                
                statusEl.textContent = "✅ Message sent successfully!";
                nameInput.value = '';
                emailInput.value = '';
                messageInput.value = '';
                lastSendTime = now;
            } catch (error) {
                console.error("Email send error:", error);
                statusEl.textContent = "❌ Failed to send message. Try again.";
            } finally {
                isSending = false;
                sendButton.disabled = false;
                sendButton.textContent = "Send! ➤📤📨⌯⌲";
            }
        };

        // Add event listener
        sendButton.addEventListener('click', sendEmail);
    </script>
</body>
</html>