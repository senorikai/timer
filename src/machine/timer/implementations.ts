import {MachineOptions, assign} from 'xstate'
import {TimerEvents} from './types/events'
import {TimerContext} from './types/context'

const implementations: MachineOptions<TimerContext, TimerEvents> = {
    actions: {
        ack: () => console.log('START received'),
        incrementCounter: assign((context, _) => {
            console.log('Counter Value from state Machine ', context.counter)
            return {
                counter: context.counter + 1
            }
        }),
        stop_timer: assign( _ => {
            return {
                counter: 0
            }
        })
    },
    services: {
        start_timer: _ => (send: any) => {
            const interval = setInterval(() => {
                send('TICK')
            }, 1000);
            return () => clearInterval(interval)
        }
    },
    activities: {},
    guards: {},
    delays: {}
}

export default implementations;