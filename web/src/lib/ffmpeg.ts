import { FFmpeg } from '@ffmpeg/ffmpeg'

import coreURL from '../assets/ffmpeg/ffmpeg-core.js?url'
import wasmURL from '../assets/ffmpeg/ffmpeg-core.wasm?url'
import workerURL from '../assets/ffmpeg/ffmpeg-worker.js?url'

let ffmpeg: FFmpeg | null

export async function loadFFmpeg() {
  if (ffmpeg) {
    return ffmpeg
  }

  ffmpeg = new FFmpeg()

  if (!ffmpeg.loaded) {
    await ffmpeg.load({
      coreURL,
      wasmURL,
      workerURL
    })
  }

  return ffmpeg
}
