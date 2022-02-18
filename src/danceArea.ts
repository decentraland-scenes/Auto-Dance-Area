import * as utils from '@dcl/ecs-scene-utils'
import { isPreviewMode } from '@decentraland/EnvironmentAPI'
import { triggerEmote, PredefinedEmote } from '@decentraland/RestrictedActions'

export let danceAreas: any = [
  {
    transform: {
      position: new Vector3(4, 0, 4),
      rotation: Quaternion.Euler(90, 0, 0),
      scale: new Vector3(1, 3, 1),
    },
    type: PredefinedEmote.ROBOT,
  },
  {
    transform: {
      position: new Vector3(10, 0, 10),
      rotation: Quaternion.Euler(90, 0, 0),
      scale: new Vector3(1, 3, 1),
    },
    type: PredefinedEmote.DISCO,
  },
]

export class DanceSystem {
  length = 11
  timer = 2
  routine: any

  routines: PredefinedEmote[] = [
    PredefinedEmote.ROBOT,
    PredefinedEmote.TIK,
    PredefinedEmote.TEKTONIK,
    PredefinedEmote.HAMMER,
    PredefinedEmote.HEAD_EXPLODDE,
    PredefinedEmote.HANDS_AIR,
    PredefinedEmote.DISCO,
    PredefinedEmote.DAB,
  ]

  constructor(routine: PredefinedEmote) {
    this.routine = routine
  }

  update(dt: number) {
    if (this.timer > 0) {
      this.timer -= dt
    } else {
      this.timer = this.length
      if (this.routine == 'all') {
        let rand = Math.floor(Math.random() * (this.routine.length - 0) + 0)
        triggerEmote({ predefined: this.routines[rand] })
      } else {
        triggerEmote({ predefined: this.routine })
      }
    }
  }
}

for (let i in danceAreas) {
  let area = new Entity('dance-' + i)
  area.addComponent(new Transform(danceAreas[i].transform))

  executeTask(async () => {
    if (await isPreviewMode()) {
      area.addComponent(new PlaneShape())
    }
  })

  engine.addEntity(area)
  let dsystem = new DanceSystem(danceAreas[i].type)

  area.addComponent(
    new utils.TriggerComponent(
      new utils.TriggerBoxShape(
        new Vector3(
          area.getComponent(Transform).scale.x,
          area.getComponent(Transform).scale.y,
          area.getComponent(Transform).scale.z
        ),
        new Vector3(0, 2.5, 0)
      ),
      {
        enableDebug: false,
        onCameraEnter: () => {
          engine.addSystem(dsystem)
        },
        onCameraExit: () => {
          engine.removeSystem(dsystem)
        },
      }
    )
  )
}
