window.onload = () => {
    // audio stuff
    let hz = 0;
    let hours = 0;
    let seconds = 0;
    let minutesElapsed = 0;
    let isPlaying = false;
    let audioContext;
    let oscillator;
    let gainNode;
    let panner; // New panner node for stereo panning
   
   
    // visuals
    let visual_content = document.getElementById("visual_content");
    let container = document.getElementsByClassName("container");
    let time_package = document.getElementById("time_package");
    let herzclock = document.getElementById("herzclock");
    let clock_face = document.getElementById("clock_face");
    let pop = document.getElementById("openPopup");
   
   
    //mouse interaction
    let isHovering = false;
   
   
    // button
    let b1 = document.getElementById("btn");
    //text stuff
    let h2 = document.getElementById("volume_warning");
    let h1 = document.getElementById("title");
   
   
    // canvas (line)
    let canvas = document.getElementById("myCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let hasDrawn = false;
   
   
   
   
    //pop up shit
    const popup = document.getElementById("popup");
    const openBtn = document.getElementById("openPopup");
    const closeBtn = document.getElementById("closePopup");
   
   
    // Open popup
    openBtn.addEventListener("click", () => {
      popup.classList.add("show");
    });
   
   
    // Close popup
    closeBtn.addEventListener("click", () => {
      popup.classList.remove("show");
    });
   
   
    // Close when clicking outside the popup
    window.addEventListener("click", (event) => {
      if (event.target === popup) {
        popup.classList.remove("show");
      }
    });
   
   
   
   
    // this function computes the current time
    function time() {
      const date = new Date();
      // document.getElementById("digitime").textContent = date.toLocaleTimeString();
   
   
      hours = date.getHours();
      const minutes = date.getMinutes();
      minutesElapsed = hours * 60 + minutes;
      seconds = date.getSeconds();
      // Convert time into a "wave" that peaks at noon (720 min) and back to 0 by midnight
      const maxMinutes = 12 * 60; // 720 minutes at noon
      hz = maxMinutes - Math.abs(maxMinutes - minutesElapsed);
   
   
      // text hz status to hz text
      document.getElementById("herzclock").textContent = hz + " hz";
   
   
      // set oscillator to the hz status
      if (isPlaying && oscillator) {
        oscillator.frequency.setValueAtTime(hz, audioContext.currentTime);
      }
      return [hz, minutesElapsed];
    }
   
   
    function moveClockFace(hz, time) {
      // console.log("x:", time); // Check x position (time)
      // console.log("y:", hz); // Check y position (hz)
   
   
      let x = getXFromTime(time);
      let y = getYFromX(x); // Use quadratic function to get correct y
   
   
      // console.log("Mapped X:", x, "Mapped Y:", y);
   
   
      visual_content.style.transform = `translate(${x - 30}px, ${y - 55}px)`;
      // clock_face.style.transform = `translate(${x - 25}px, ${y - 25}px)`;
    }
   
   
    function getXFromTime(time) {
      return (time / 1440) * canvas.width;
    }
   
   
    function getYFromX(x) {
      let t = x / canvas.width; // Normalize x to [0,1] range
      let y =
        (1 - t) ** 2 * canvas.height +
        2 * (1 - t) * t * 0 +
        t ** 2 * canvas.height;
      return y;
    }
   
   
    function drawLine() {
      let ctx = canvas.getContext("2d");
   
   
      // prevents the line being drawn over and over on top on itself
      ctx.clearRect(0, 0, canvas.width, canvas.height);
   
   
      ctx.beginPath();
      ctx.moveTo(0, canvas.height); // Bottom-left corner
      ctx.quadraticCurveTo(canvas.width / 2, 0, canvas.width, canvas.height); // Arc to bottom-right
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.stroke();
      visual_content.style.display = "block";
      pop.style.display = "block";
   
   
      setTimeout(() => {
        visual_content.style.opacity = "1"; // Fade in
        pop.style.opacity = "1";
        canvas.style.opacity = "1"; // Fade in
      }, 20); // Small delay to ensure display is set before opacity change
    }
   
   
    // hover over hz to reveal time
    time_package.addEventListener("mouseenter", () => {
      isHovering = true;
      // console.log("mouse entered")
      herzclock.dataset.originalText = herzclock.textContent; // Store original text
      herzclock.textContent = new Date().toLocaleTimeString(); // Change to time
      herzclock.style.opacity = 1; // Fade back in
    });
    time_package.addEventListener("mouseleave", () => {
      isHovering = false;
      // console.log("mouse left")
      // herzclock.style.opacity = 0; // Start fade-out
      herzclock.textContent = herzclock.dataset.originalText; // Restore original text
      herzclock.style.opacity = 1; // Fade back in
    });
   
   
    // fades volume so it's not abrupt
    function fadeVolume(targetVolume) {
      if (!audioContext) return; // Ensure audioContext exists before using it
      let currentTime = audioContext.currentTime;
      gainNode.gain.setTargetAtTime(targetVolume, currentTime, 3);
    }
   
   
    // this button click action reveals the visuals, and makes the oscillator play/pause
    b1.onclick = () => {
      if (!isPlaying) {
        // reveal visuals
        b1.textContent = "🔇";
   
   
        if (!hasDrawn) {
          canvas.style.display = "block"; // Show the canvas
          time();
          drawLine();
          let [x_var, y_var] = time();
   
   
          moveClockFace(x_var, y_var);
          hasDrawn = true;
        }
        b1.style.transform = "translateY(-70px)";
        b1.style.fontSize = "25px";
        b1.style.padding = "10px 22px";
        h1.style.transform = "translateY(-70px)";
        h1.style.fontSize = "35px";
   
   
        // create new oscillator (per start/stop) and
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        oscillator = audioContext.createOscillator();
        gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
   
   
        const minutesElapsed =
          new Date().getHours() * 60 + new Date().getMinutes();
        const maxMinutes = 12 * 60;
        const hz = maxMinutes - Math.abs(maxMinutes - minutesElapsed);
        oscillator.frequency.setValueAtTime(hz, audioContext.currentTime);
        fadeVolume(0.4); // Fade in over 0.5 seconds
   
   
        oscillator.start();
   
   
        isPlaying = true;
      } else {
        b1.textContent = "🔊";
        oscillator.stop();
        audioContext.close();
        audioContext = null;
        oscillator = null;
        gainNode = null;
   
   
        isPlaying = false;
      }
    };
   
   
    // Update time and frequency every second
    setInterval(() => {
      let [hz, minutesElapsed] = time(); // Get updated values
      moveClockFace(hz, minutesElapsed); // Move clock face accordingly
   
   
      if (!isHovering) {
        herzclock.textContent = hz + " hz";
      } else {
        herzclock.textContent = new Date().toLocaleTimeString(); // Change to time
      }
      if (hours < 7 || hours >= 18) {
        // Blue for before 7 AM or after 6 PM
        clock_face.style.background =
          "radial-gradient(circle, blue 0%, rgba(0, 0, 255, 0) 100%)";
      } else {
        // Yellow for between 7 AM and 6 PM
        clock_face.style.background =
          "radial-gradient(circle, yellow 0%, rgba(255, 255, 0, 0) 100%)";
      }
    }, 1000);
    // setInterval(time, 1000);
   };
   