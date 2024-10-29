import webview from "@suchipi/webview"; // Import the webview module
import { spawn } from "child_process"; // Import the spawn function from child_process

// Spawn the webview process
const child = spawn(
  webview.binaryPath,
  webview.optionsToArgv({
    title: "My App",
    width: 1024,
    height: 768,
    dir: process.cwd() + "/public",
  }),
  {
    cwd: process.cwd(),
  }
);

// Listen for incoming messages from the webview process
child.stdout.on("data", (data) => {
  const message = data.toString().trim();
  console.log("Received message from webview:", message);

  if (message.startsWith("runCommand:")) {
    const command = message.split(":")[1];
    console.log("Executing command:", command);
    // Execute the command here, and send results back if needed
    executeCommand(command)
      .then((result) => {
        // Send result back to the webview
        child.stdin.write(`commandResult:${result}\n`); // Adjust based on your output needs
      })
      .catch((error) => {
        child.stdin.write(`commandResult:${error.message}\n`); // Handle errors
      });
  }
});

// Keep the process alive
child.on("exit", (code) => {
  console.log(`Webview exited with code ${code}`);
});

// Mock function to execute commands
async function executeCommand(command) {
  // Here you would handle executing the command
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Executed: ${command}`);
    }, 1000);
  });
}
