type EntityActionTest =
  | {
      load: ActionTest
    }
  | {
      save: SaveActionTest
    }

interface SaveActionTest extends ActionTest {
  changes: Record<string, any>
}

type TestEntityMap = {
  [name: string]: EntityActionTest
}

type ActionTest = {
  args?: Record<string, any>
  expectations?: Record<string, Assertions>
}

type Assertions = {
  sameAs?: any
  toBe?: TestToBe[]
}

type TestToBe = "defined" | "falsy"

export type { TestEntityMap }
