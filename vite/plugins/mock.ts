import { viteMockServe } from 'vite-plugin-mock'
export function setupMockPlugin(enableMock: boolean) {
  return viteMockServe({
    mockPath: 'mock',
    localEnabled: enableMock,
  })
}
