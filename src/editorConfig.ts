//Main Entry Point for Blinkjs extended grapesjs object
import grapesjs from "grapesjs";
//import type { BlinkJS } from "./editorTypes";

export const BlinkJS: (typeof BlinkJSTemplate & typeof grapesjs) = grapesjs as any;

//export const blinkjs: typeof BlinkJS = Object.create(grapesjs);

