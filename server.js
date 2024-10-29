import webview from "@suchipi/webview"; // Import the webview module
import { spawn } from "child_process"; // Import the spawn function from child_process

// webview is an object with this shape:
// {
//   binaryPath: string, // The absolute path to the binary for your platform
//   optionsToArgv: Function, // Convert an options object to the appropriate argv to pass to the binary
//   spawn: Function, // use child_process.spawn to run the binary
//   spawnSync: Function, // use child_process.spawnSync to run the binary
//   exec: Function, // use child_process.execFile to run the binary
//   execSync: Function, // use child_process.execFileSync to run the binary
// }

// You can either use webview.binaryPath and webview.optionsToArgv to spawn it yourself:
const child1 = spawn(
  webview.binaryPath,
  webview.optionsToArgv({
    title: "My App !",
    width: 1024,
    height: 768,
    dir: process.cwd() + "/public",
  }),
  {
    cwd: process.cwd(),
  }
);

// or you can use the provided helper functions to spawn it using child_process.
// Note that the helper function accepts webview options and spawn options in the same object.
const child2 = webview.spawn({
  // options for webview
  title: "My App ??",
  width: 1024,
  height: 768,
  dir: process.cwd() + "/public",

  // options for child_process.spawn
  cwd: process.cwd(),
});
