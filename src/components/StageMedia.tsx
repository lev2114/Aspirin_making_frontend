import { useState } from 'react'
import type { Stage } from '../types/stage'

const DEFAULT_IMAGE = '/media/default.png'
const DEFAULT_VIDEO = '/media/default.mp4'

interface Props {
  stage: Stage
  className?: string
}

export function StageImage({ stage, className }: Props) {
  const [failed, setFailed] = useState(false)
  return <img className={className}
    src={failed ? DEFAULT_IMAGE : stage.aspirin_stage_image?.trim() || DEFAULT_IMAGE}
    alt={stage.aspirin_stage_name} onError={() => setFailed(true)} />
}

export function StageVideo({ stage, className }: Props) {
  const [failed, setFailed] = useState(false)
  const [posterFailed, setPosterFailed] = useState(false)
  const [unavailable, setUnavailable] = useState(false)
  const source = failed ? DEFAULT_VIDEO : stage.aspirin_stage_video?.trim() || DEFAULT_VIDEO
  const poster = posterFailed ? DEFAULT_IMAGE : stage.aspirin_stage_image?.trim() || DEFAULT_IMAGE

  if (unavailable) return <div className="media-unavailable" role="status">Видео недоступно</div>
  return <>
    <img hidden src={poster} alt="" onError={() => setPosterFailed(true)} />
    <video key={source} className={className} src={source} poster={poster}
      controls muted loop playsInline preload="metadata" aria-label={`Видео: ${stage.aspirin_stage_name}`}
      onError={() => source === DEFAULT_VIDEO ? setUnavailable(true) : setFailed(true)}>
      Ваш браузер не поддерживает видео.
    </video>
  </>
}
