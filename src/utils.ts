import { Context, Task, TasksTypesFn } from "./types"

function perform_tasks(tasks: Task[], context: Context ) {
  tasks.forEach(task => {
    const [_, __, ...types] = Object.keys(task)

    types.forEach(type => {
      const typeFn = tasksTypes[type as keyof TasksTypesFn]

      if(!typeFn) {
        throw new Error('unable to find task of type ' + type)
      }

      typeFn(task, context)
    })
  })

  return context
}

function set(task: Task, context: Context) {
  if(!task.set) {
    return
  }

  const source_name = Object.keys(task.set)[0]

  if(!source_name) {
    throw new Error('A source object is required when setting a target')
  }

  const target  = context[task.on]
  const target_field = task.field

  const source = context[source_name as keyof Context]
  const source_field: any = task.set[source_name as keyof Context]
  
  target[target_field] = source[source_field]
}

const tasksTypes: TasksTypesFn = {
  set
}

export { perform_tasks };

export type {
  Task
}
