import * as utils from '@dcl/ecs-scene-utils'
import { isPreviewMode } from '@decentraland/EnvironmentAPI'
import { triggerEmote, PredefinedEmote } from '@decentraland/RestrictedActions'

//// List of dance areas - add here the locations where you want dancing to happen

export let danceAreas: any = [
  {
    transform: {
      position: new Vector3(4, 0, 4),
      scale: new Vector3(4, 4, 4),
    },
    type: PredefinedEmote.ROBOT,
  },
  {
    transform: {
      position: new Vector3(10, 0, 10),
      scale: new Vector3(4, 4, 4),
    },
    type: PredefinedEmote.DISCO,
  },
]

////// DEBUG FLAG - Set to true to view all dance areas
const DEBUG_FLAG = false

///// This system acts on the danceAreas defined above

export class DanceSystem {
  length = 11
  timer = 2
  routine: any
  danceFunction: () => void = () => {
    //   log('pointer Up')
    this.dance()
  }

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
      this.dance()
    }
  }
  dance() {
    this.timer = this.length
    if (this.routine == 'all') {
      let rand = Math.floor(Math.random() * (this.routine.length - 0) + 0)
      triggerEmote({ predefined: this.routines[rand] })
    } else {
      triggerEmote({ predefined: this.routine })
    }
  }
  addEvents() {
    Input.instance.subscribe(
      'BUTTON_UP',
      ActionButton.FORWARD,
      false,
      this.danceFunction
    )

    Input.instance.subscribe(
      'BUTTON_UP',
      ActionButton.BACKWARD,
      false,
      this.danceFunction
    )

    Input.instance.subscribe(
      'BUTTON_UP',
      ActionButton.RIGHT,
      false,
      this.danceFunction
    )

    Input.instance.subscribe(
      'BUTTON_UP',
      ActionButton.LEFT,
      false,
      this.danceFunction
    )
  }
  removeEvents() {
    Input.instance.unsubscribe(
      'BUTTON_UP',
      ActionButton.FORWARD,
      this.danceFunction
    )

    Input.instance.unsubscribe(
      'BUTTON_UP',
      ActionButton.BACKWARD,
      this.danceFunction
    )

    Input.instance.unsubscribe(
      'BUTTON_UP',
      ActionButton.RIGHT,
      this.danceFunction
    )

    Input.instance.unsubscribe(
      'BUTTON_UP',
      ActionButton.LEFT,
      this.danceFunction
    )
  }
}

for (let i in danceAreas) {
  let area = new Entity('dance-' + i)
  area.addComponent(new Transform(danceAreas[i].transform))

  executeTask(async () => {
    if (DEBUG_FLAG && (await isPreviewMode())) {
      area.addComponent(new BoxShape())
      area.getComponent(BoxShape).withCollisions = false
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
          dsystem.addEvents()
        },
        onCameraExit: () => {
          dsystem.removeEvents()
          engine.removeSystem(dsystem)
        },
      }
    )
  )
}
