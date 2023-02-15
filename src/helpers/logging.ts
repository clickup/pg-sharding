import logUpdate from "log-update";

const progressObj = logUpdate.create(process.stdout, { showCursor: true });

export function progress(...lines: string[]): void {
  const date = new Date()
    .toString()
    .replace(/ GMT.*/, "")
    .replace(/ \(.*/, "");
  const text = lines.join("\n").replace(/^/gm, `[${date}] `);
  progressObj(stripPassword(text));
}

progress.clear = () => progressObj.clear();
progress.done = () => progressObj.done();

export function log(msg: string): void {
  progress.done();
  progress(msg);
  progress.done();
}

function stripPassword(s: string): string {
  return s.replace(/(\w+\\?:\/\/[^:]+\\?):[^\\@]+\\?@/gs, "$1@");
}
