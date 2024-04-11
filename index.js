
let timerInterval;
let remainingTime = 25 * 60; // Initial focus interval in seconds
let focusInterval = 25 * 60; // Default focus interval in seconds
let breakInterval = 5 * 60;   // Default break interval in seconds
let isFocusMode = true; // Initial mode is focus mode
let isPaused = false;

function updateTimerDisplay() {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;
    document.getElementById('timer').innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}


document.getElementById('timerSize').addEventListener('input', function() {
    let timerSize = parseInt(this.value);
    document.getElementById('timer').style.fontSize = `${timerSize}px`;
});

document.getElementById('timerColor').addEventListener('input', function() {
    let timerColor = this.value;
    document.getElementById('timer').style.color = timerColor;
});


function toggleMode() {
    isFocusMode = !isFocusMode;
    if (isFocusMode) {
        remainingTime = focusInterval;
        document.getElementById('mode').innerText = 'Focus Mode';
    } else {
        remainingTime = breakInterval;
        document.getElementById('mode').innerText = 'Break Mode';
    }
    updateTimerDisplay();
}


document.getElementById('showTaskFormBtn').addEventListener('click', function() {
    const taskForm = document.getElementById('taskForm');
    const tasks = document.getElementById('tasks');
    taskForm.classList.toggle('hidden');
    tasks.classList.toggle('hidden');
});

document.getElementById('addTaskBtn').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskList = document.getElementById('taskList');
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        listItem.addEventListener('click', function() {
            this.remove();
        });
        taskList.appendChild(listItem);
        taskInput.value = '';
    }
});

document.getElementById('taskInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskList = document.getElementById('taskList');
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        listItem.addEventListener('click', function() {
            this.remove();
        });
        taskList.appendChild(listItem);
        taskInput.value = '';
    }
}



document.getElementById('bgImage').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        document.body.style.backgroundImage = `url(${e.target.result})`;
    };
    reader.readAsDataURL(file);
});

function togglePauseResume() {
    if (isPaused) {
        timerInterval = setInterval(updateTimer, 1000);
        document.getElementById('pauseResumeBtn').innerText = 'Pause';
    } else {
        clearInterval(timerInterval);
        document.getElementById('pauseResumeBtn').innerText = 'Resume';
    }
    isPaused = !isPaused;
}

function updateTimer() {
    remainingTime--;
    if (remainingTime <= 0) {
        toggleMode();
    }
    updateTimerDisplay();
}

document.getElementById('pauseResumeBtn').addEventListener('click', togglePauseResume);

// Settings
document.getElementById('focusInterval').addEventListener('change', function() {
    focusInterval = parseInt(this.value) * 60;
    if (isFocusMode) {
        remainingTime = focusInterval;
        updateTimerDisplay();
    }
});

document.getElementById('breakInterval').addEventListener('change', function() {
    breakInterval = parseInt(this.value) * 60;
    if (!isFocusMode) {
        remainingTime = breakInterval;
        updateTimerDisplay();
    }
});

document.getElementById('settingsBtn').addEventListener('click', function() {
    let settingsPanel = document.getElementById('settingsPanel');
    if (settingsPanel.style.display === 'block') {
        settingsPanel.style.display = 'none';
    } else {
        settingsPanel.style.display = 'block';
    }
});


document.getElementById('bgColor').addEventListener('input', function() {
    document.body.style.backgroundColor = this.value;
});

// Initial setup
updateTimerDisplay();
timerInterval = setInterval(updateTimer, 1000);


let sessionCount = 0;

function startFocusTimer() {
    // Your existing code to start focus timer
    
    // Increment session count when starting focus timer
    sessionCount++;
    updateSessionCounter();
}

function startBreakTimer() {
    // Your existing code to start break timer
    
    // Increment session count when starting break timer
    sessionCount++;
    updateSessionCounter();
}

function updateSessionCounter() {
    document.getElementById('sessionCount').textContent = sessionCount;
}
