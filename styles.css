:root {
    --bg-color: #F5F5DC; /* warm beige */
    --text-color: #191970; /* deep indigo */
    --card-bg: #E6E6FA; /* soft lavender */
    --accent: #B0C4DE; /* dusty blue */
    --shadow: rgba(0, 0, 0, 0.1);
    --border-radius: 12px;
    --transition: all 0.3s ease;
}

body.dark {
    --bg-color: #191970; /* deep indigo */
    --text-color: #E6E6FA; /* soft lavender */
    --card-bg: #483D8B; /* muted purple */
    --accent: #B0C4DE; /* dusty blue */
    --shadow: rgba(255, 255, 255, 0.1);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background-color: var(--bg-color);
    color: var(--text-color);
    line-height: 1.6;
    transition: var(--transition);
    padding: 20px;
    min-height: 100vh;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px;
    background-color: var(--card-bg);
    border-radius: var(--border-radius);
    box-shadow: 0 4px 8px var(--shadow);
}

h1, h2 {
    margin-bottom: 10px;
}

.controls {
    display: flex;
    gap: 10px;
}

button {
    background-color: var(--accent);
    color: var(--text-color);
    border: none;
    padding: 8px 12px;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: var(--transition);
}

button:hover {
    background-color: var(--card-bg);
}

section {
    margin-bottom: 30px;
    padding: 20px;
    background-color: var(--card-bg);
    border-radius: var(--border-radius);
    box-shadow: 0 4px 8px var(--shadow);
}

#emotion-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 10px;
}

.emotion-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: var(--transition);
    background-color: var(--bg-color);
}

.emotion-item.selected {
    background-color: var(--accent);
    color: var(--bg-color);
}

textarea {
    width: 100%;
    height: 150px;
    padding: 10px;
    border: 1px solid var(--accent);
    border-radius: var(--border-radius);
    resize: vertical;
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: var(--transition);
}

textarea:focus {
    outline: none;
    border-color: var(--text-color);
}

#history-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.history-card {
    padding: 15px;
    background-color: var(--bg-color);
    border-radius: var(--border-radius);
    box-shadow: 0 2px 4px var(--shadow);
    position: relative;
}

.history-card .delete-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #ff6b6b;
    color: white;
    border: none;
    padding: 5px 8px;
    border-radius: 50%;
    cursor: pointer;
}

#message-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--card-bg);
    padding: 20px;
    border-radius: var(--border-radius);
    box-shadow: 0 4px 8px var(--shadow);
    text-align: center;
    z-index: 1000;
}

.hidden {
    display: none;
}

@media (max-width: 600px) {
    header {
        flex-direction: column;
        gap: 10px;
    }
    #emotion-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
