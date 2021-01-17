import {MachineConfig} from 'xstate'
import {TimerEvents} from './types/events'
import {TimerContext} from './types/context'
import {TimerStateSchema} from './types/stateSchema'

const config: MachineConfig<TimerContext, TimerStateSchema, TimerEvents> = {
    id: 'timer',
    initial: 'idle',
    context: {counter : 0},
    states: {
        idle: {
            on: {
                START_TIMER: 'start'
            }
        },
        start: {
            entry: 'ack',
            invoke: {
                id: 'start_timer',
                src: 'start_timer'
            },
            on: {
                TICK: {
                    actions: 'incrementCounter'
                },
                STOP_TIMER: 'stop'
            }
        },
        stop: {
            entry: 'stop_timer'
        }
    }
}

export default config;