
// type workerType = "editor" | "json" | "css" | "html" | "ts";
// type newWorker = new (options?: {
//   name?: string;
// }) => Worker
//
// type Workers = Array<{ type: workerType, worker: newWorker }>;

/**
 * Sets up Monaco Editor workers.
 * This needs to be called before Monaco is used in the application.
 *
 * @param basePath The base path where worker files are located
 */
export function setupMonacoWorkers(basePath = '') {
  // Define the global MonacoEnvironment
  window.MonacoEnvironment = {
    getWorkerUrl: function(_moduleId: string, label: string) {
      // Return the appropriate worker based on the language
      if (label === 'json') {
        return `${basePath}/json.worker.js`;
      }
      if (label === 'css' || label === 'scss' || label === 'less') {
        return `${basePath}/css.worker.js`;
      }
      if (label === 'html' || label === 'handlebars' || label === 'razor') {
        return `${basePath}/html.worker.js`;
      }
      if (label === 'typescript' || label === 'javascript') {
        return `${basePath}/ts.worker.js`;
      }
      // Default worker for editor functionality
      return `${basePath}/editor.worker.js`;
    }
  };
}

// export function setupMonacoWorkers(config: Workers) {
//   window.MonacoEnvironment = {
//     getWorker: function(_moduleId: any, label: string) {
//       console.log('Getworker running', label, _moduleId);
//       if (label === "json") {
//         const worker = config.find(({ type }) => type === "json");
//         if (worker) {
//           return new worker.worker;
//         }
//         // return new jsonWorker();
//       }
//       if (
//         label === "css" ||
//         label === "scss" ||
//         label === "less"
//       ) {
//         // return createWorker(cssWorker, "css");
//         const worker = config.find(({ type }) => type === "css");
//         if (worker) {
//           return new worker.worker;
//         }
//         // return new cssWorker();
//       }
//       if (
//         label === "html" ||
//         label === "handlebars" ||
//         label === "razor"
//       ) {
//         // return createWorker(htmlWorker, "html");
//         const worker = config.find(({ type }) => type === "css");
//         if (worker) {
//           return new worker.worker;
//         }
//         // return new htmlWorker();
//       }
//       if (
//         label === "typescript" ||
//         label === "javascript"
//       ) {
//         // return createWorker(tsWorker, "typescript");
//         const worker = config.find(({ type }) => type === "css");
//         if (worker) {
//           return new worker.worker;
//         }
//         // return new tsWorker();
//       }
//       // return createWorker(editorWorker, label);
//       const worker = config.find(({ type }) => type === "editor");
//       if (worker) {
//         return new worker.worker;
//       } else {
//         return new editorWorker();
//       }
//     }
//   };
// }
