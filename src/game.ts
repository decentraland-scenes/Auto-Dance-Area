const base = new Entity()
base.addComponent(new GLTFShape('models/baseLight.glb'))
engine.addEntity(base)

const platform1 = new Entity()
platform1.addComponent(new GLTFShape('models/platform.glb'))
platform1.addComponent(
  new Transform({
    position: new Vector3(4, 0, 4),
  })
)
engine.addEntity(platform1)

const platform2 = new Entity()
platform2.addComponent(new GLTFShape('models/platform.glb'))
platform2.addComponent(
  new Transform({
    position: new Vector3(10, 0, 10),
  })
)
engine.addEntity(platform2)
