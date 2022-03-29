let EventQueue = [];
let pending = false;
function addQueue(event) {
  EventQueue.push(event);
  if (!pending) {
    executionQueue(event);
  }
}
async function executionQueue(event) {
  pending = true;
  await event();
  EventQueue.shift();
  pending = false;
  if (EventQueue.length) {
    executionQueue(EventQueue[0]);
  }
}

export { addQueue as default };
